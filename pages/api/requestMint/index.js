import playwright from 'playwright';
import withAuth from "middleware/auth";
import image from 'next/image';
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);
const { ethers } = require("ethers");
const { MongoClient } = require('mongodb');
const uri = process.env.DB_HOST;
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
const fs = require("fs");
var path = require("path");

async function renderImage(state) {
    const browser = await playwright['chromium'].launch();
    // Create a page with the Open Graph image size best practise
    const page = await browser.newPage({
        viewport: {
            width: state.memeWidth + 50,
            height: state.memeHeight + 230,
        }
    });
  
    // Generate the full URL out of the given path (GET parameter)
    const url = "localhost:3000/memeTemplate?state=" + encodeURIComponent(JSON.stringify(state));
    await page.goto(url, {
        timeout: 30 * 1000
    })
  
    await wait(1000);
  
    const data = await page.screenshot()
    await browser.close()
    fs.writeFileSync("/tmp/temp.png", data);
    return fs.createReadStream('/tmp/temp.png');     
}

function wait(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms)
        }, ms )
    });
}  
  
async function hashIsUnique(memeHash, client) {
    try {
        // check mint queue for hash
        const mintQueueCollection = client.db("primary").collection("mintQueue");
        const m1 = await mintQueueCollection.findOne({hash: {$eq: memeHash}});
        if (m1?.memeHash) {
            return false;
        } else {
            // check metadata collection for hash
            const metadataCollection = client.db("primary").collection("metedata");
            const m2 = await metadataCollection.findOne({hash: {$eq: memeHash}});
            if (m2?.hash) {
                return false;
            } else {
                return true;
            }
        }
    } catch (e) {
        console.error(e);
        return false;
    }
}

// creates meme DNA sequence
function createDNA(state) {
    // start by creating dna
    let DNA = '';
    // create captions array
    let captions = [];
    state.textLocations.forEach((textLocation) => {
        // removes everything except numbers and letters. TODO - make sure this is what I actually want to do
        let c = textLocation.text;
        captions.push(c.replace(/[^\p{L}\p{N}]/gu, '').toUpperCase());
    });
    // sort alphabetically
    captions = captions.sort();
    // add main caption to front of list
    let mc = state.mainCaption;
    captions.unshift(mc.replace(/[^\p{L}\p{N}]/gu, '').toUpperCase());

    // create sticker array
    let stickers = [];
    state.stickerLocations.forEach((stickerLocation) => {
        stickers.push(stickerLocation.stickerIdentifier);
    });
    // sort alphabetically
    stickers = stickers.sort();

    // create layout fill unique ids array
    let layoutFillIds = [];
    state.layoutSections.forEach((section) => {
        layoutFillIds.push(section.uniqueId);
    });

    // get layoutId
    const layoutIdentifier = state.layout.layoutIdentifier;

    // compile DNA components into sequence
    DNA = layoutIdentifier;
    layoutFillIds.forEach((str) => {
        DNA += str;
    });
    captions.forEach((str) => {
        DNA += str;
    });
    stickers.forEach((str) => {
        DNA += str;
    });

    return DNA;
}

function hashDNA(DNA) {
    const encoded = web3.eth.abi.encodeParameters(['string'], [DNA])
    return web3.utils.sha3(encoded, {encoding: 'hex'});
}

function createMemeMetadata(name, image, description, creator, creatorAddress, dynasty, headOfDynasty, DNA, hash, danknessTier, creationDate, lineage, state, requiredImageApprovals, redirectLink) {
    return {
        name: name,
        image: image,
        description: description,
        creator: creator,
        creatorAddress: creatorAddress,
        dynasty: dynasty,
        headOfDynasty: headOfDynasty,
        DNA: DNA,
        hash: hash,
        danknessTier: danknessTier,
        rarityBackground: rarityBackground,
        score: score,
        upvotes: upvotes,
        downvotes: downvotes,
        creationDate: creationDate,
        lineage: lineage,
        descendants: 0,
        quantity: 1,
        state: state,
        requiredImageApprovals: requiredImageApprovals,
        redirectLink: redirectLink,
    };
}

function createMemeRedirectLink(creatorName, creatorMemeIndex, memeHash) {
    return {creator: creatorName, memeIndex: creatorMemeIndex, memeHash: memeHash}; 
}

const handler = async(req, res) => {
    // TODO - validate all inputs

    let userCollection;
    let user;
    // get user
    try {
        userCollection = client.db("primary").collection("users");
        user = await userCollection.findOne({address: {$eq: req.user}});
    } catch (e) {
        console.log(e);
        return res.status(404).send("user not found");
    }

    // get state from body
    let state = req.body.state;

    // TODO - get parent lineage array
    let parent = 0;
    let lineage = [parent];
    // TODO - get dynasty from parent
    let dynasty = "testing-dynasty";
    // TODO - if no parent, then head of dynasty == ture
    let headOfDynasty = true;

    // connect to db
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // compile DNA sequence 
    const DNA = createDNA(state);
    // hash DNA
    const memeHash = hashDNA(DNA);

    // check if hash is unique
    const isUnique = await hashIsUnique(memeHash, client);
    if (!isUnique) {
        await client.close();
        return res.status(409).send("error, hash is not unique");
    }
    // render image
    const imgStream = await renderImage(state);

    // pin image file
    const options = {
        pinataMetadata: {
            name: req.body.name,
            keyvalues: {}
        },
        pinataOptions: {
            cidVersion: 0
        }
    };
    let ipfsHash = await pinata.pinFileToIPFS(imgStream, options).then((result) => {
        //handle results here
        fs.unlink('/tmp/temp.png', () => {console.info("deleted temporary file")});
        return result.IpfsHash;
    }).catch((err) => {
        //handle error here
        console.log(err);
    });

    // create redirect link object
    const redirectLink = createMemeRedirectLink(user.handle, user.memeIndex, memeHash);

    // create metadata object
    let currentTime = Date.now();
    let metadata = createMemeMetadata(
        req.body.name, 
        `ipfs://${ipfsHash}`, 
        `A gloriously dank meme created by ${user.handle} and minted with DankMinter. Mint your own one-of-a-kind NFT memes at https://www.dankminter.com`,
        user.handle,
        user.address,
        dynasty,
        headOfDynasty,
        DNA,
        memeHash,
        1,
        currentTime,
        lineage,
        state,
        [],
        redirectLink
    );

    // insert into mint queue and increment users memeIndex
    try {
      const mintQueueCollection = client.db("primary").collection("mintQueue");
      await mintQueueCollection.insertOne(metadata);
      await userCollection.updateOne({address: {$eq: user.address}}, {$inc: {memeIndex: 1}});
    } catch(e) {
      console.error(e);
      // TODO - handle reverting image pin + metadata update
      return res.status(500).json({ error: e.message })
    }

    await client.close();
    return res.status(200).json({ message: "success, mint request queued", imageURI: `https://dankminter.mypinata.cloud/ipfs/${ipfsHash}`});
}

export default withAuth(handler);