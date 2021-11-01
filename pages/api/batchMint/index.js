const { MongoClient, ObjectId } = require('mongodb');
import withAuth from "middleware/auth";
const { ethers } = require("ethers");
const fs = require("fs");
var path = require("path");
const uri = process.env.DB_HOST;

const handler = async (req, res) => {
    // connect to database
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log("0");
    let memesToMint;
    // fetch 10 memes from mint queue
    try {
        const mintQueueCollection = client.db("primary").collection("mintQueue");
        memesToMint = await mintQueueCollection.find().sort({created: 1}).limit(10).toArray();
        console.log(memesToMint);
    } catch (e) {
        console.error(e);
        res.status(500).send(e.message);
    }

    // if no memes, then return successful
    if (memesToMint.length == 0) {
        res.status(200).send("success, no memes in queue");
    }
    console.log("1");
    // mint addresses
    let firstMintAddresses = [];
    // create batch mint array
    let mintBatch = [];
    for (let i = 0; i < memesToMint.length; i++) {
        let memeToMint = memesToMint[i];
        if (!firstMintAddresses.includes(memeToMint.mintToAddress)) {
            const nftMetadataURI = `${process.env.NEXT_PUBLIC_DANKMINTER_DOMAIN}/api/metadata/${memeToMint.memeHash}`;
            mintBatch.push({
                templateId: memeToMint.state.templateId,
                text: memeToMint.captions,
                uri: nftMetadataURI,
                mintToAddress: memeToMint.mintToAddress,
            });
            if (memeToMint.mintedBefore === false) {
                firstMintAddresses.push(memeToMint.mintToAddress);            
            }
        }
    }
    console.log("2");
    // batch mint
    const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_DANKMINTER_ADDRESS;
    const contractsDirectory = path.resolve(process.cwd(), "contracts");
    const abi = fs.readFileSync(
      path.join(contractsDirectory, "dankminter-abi.json"),
      "utf8"
    );
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner();
    const dankMinter = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    console.log("2.5");
    console.log(mintBatch);
    const receipt = await (await dankMinter.batchMintMemes(mintBatch)).wait(1);
    console.log("NFT memes minted:", receipt);

    console.log("3");
    // get new meme events
    let newMemeEvents = [];
    let failedMintEvents = [];
    for (const event of receipt.events) {
        if (event.event === 'NewMeme') {
            newMemeEvents.push(event);
        } else if (event.event === 'FailedMint') {
            failedMintEvents.push(event);
        }
    }

    // TODO - make this more performant by switching to batch updates instead of updating everything seperately
    // as it is, this is really not performanct at all, but that's ok because I can set the timeout to 60 seconds
    // will need to increase performance if I want to call this function every 10 seconds for increased throughput
    // I can also increase throughput, by parallelizing this with multiple minter accounts
    for (let memeToMint of memesToMint){
        for (const event of newMemeEvents) {
            // find corresponding event for each meme
            if (event.args[0] === memeToMint.memeHash) {
                let printNum = event.args[2].toString();
                let memeMetadata = memeToMint.metadata;
                // update meme metadata with print number
                memeMetadata.attributes.push({
                    trait_type: "Print Number",
                    value: printNum,
                });
                // write metadata to db
                try {
                    const metadataCollection = client.db("primary").collection("metadata");
                    await metadataCollection.insertOne(memeMetadata);
                } catch(e) {
                    console.error(e);
                    // TODO - handle error writing metadata to db
                }

                const userCollection = client.db("primary").collection("users");
                try {
                    // add qr link to db, update users memeIndex and decrement reservedTreeFiddyBalance
                    const linkCollection = client.db("primary").collection("memelinks");
                    let user = await userCollection.findOne({address: {$eq: memeToMint.mintToAddress}});
                    await linkCollection.insertOne({creator: user.handle, memeIndex: user.memeIndex, memeHash: memeToMint.memeHash});
                    await userCollection.updateOne({address: {$eq: user.address}}, {$inc: {memeIndex: 1}, $inc: {reservedTreeFiddyBalance: -35}, $set: {mintedBefore: true}});
                    
                    // if meme is first to be minted by user, then find and update any other memes that might have been requested
                    if (memeToMint.mintedBefore === false) {
                        const mintQueueCollection = client.db("primary").collection("mintQueue");
                        await mintQueueCollection.updateMany({mintToAddress: {$eq: memeToMint.mintToAddress}}, {$set: {mintedBefore: true}});
                    }
                } catch(e) {
                    console.error(e);
                    // TODO - handle error writing link/updating users memeindex
                }
                // remove meme from queue
                try {
                    const mintQueueCollection = client.db("primary").collection("mintQueue");
                    await mintQueueCollection.deleteOne({memeHash: memeToMint.memeHash});
                } catch (e) {
                    console.error(e);
                    // TODO - handle error removing meme from queue
                }
                break;
            }
        }
    }    

    console.log("5");
    // TODO - handle failures which = failed mint
    await client.close();
    res.status(200).send("successfully minted xxx memes");
}

// TODO - somehow secure this function so it can only be called by the cron
export default handler;