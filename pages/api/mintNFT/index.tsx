import { AlchemyProvider } from '@ethersproject/providers';
import { NextApiRequest, NextApiResponse } from 'next';
import { ImmutableMethodParams, ImmutableXClient } from '@imtbl/imx-sdk';
import { Wallet } from '@ethersproject/wallet';
const { MongoClient } = require('mongodb');
const uri = process.env.DB_HOST;

const provider = new AlchemyProvider('ropsten', process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);
const component = 'dankminter-bulk-mint-function';

const waitForTransaction = async (promise: Promise<string>) => {
    const txId = await promise;
    console.info(component, 'Waiting for transaction', {
      txId,
      etherscanLink: `https://ropsten.etherscan.io/tx/${txId}`,
      alchemyLink: `https://dashboard.alchemyapi.io/mempool/eth-ropsten/tx/${txId}`,
    });
    const receipt = await provider.waitForTransaction(txId);
    if (receipt.status === 0) {
      throw new Error('Transaction rejected');
    }
    console.info(component, `Transaction Mined: ${receipt.blockNumber}`);
    return receipt;
};

async function mintNFTs(payload: ImmutableMethodParams.ImmutableOffchainMintV2ParamsTS) {
    const minter = await ImmutableXClient.build({
        publicApiUrl: process.env.NEXT_PUBLIC_API_URL,
        starkContractAddress: process.env.STARK_CONTRACT_ADDRESS,
        registrationContractAddress: process.env.REGISTRATION_ADDRESS,
        gasLimit: process.env.GAS_LIMIT,
        gasPrice: process.env.GAS_PRICE,
        signer: new Wallet(process.env.OWNER_ACCOUNT_PRIVATE_KEY).connect(provider),
    });

    console.info(component, 'MINTER REGISTRATION');
    const registerImxResult = await minter.registerImx({
        etherKey: minter.address.toLowerCase(),
        starkPublicKey: minter.starkPublicKey,
    });

    if (registerImxResult.tx_hash === '') {
        console.info(component, 'Minter registered, continuing...');
    } else {
        console.info(component, 'Waiting for minter registration...');
        await waitForTransaction(Promise.resolve(registerImxResult.tx_hash));
    }

    const result = await minter.mintV2(payload);
    return result;
}

function toHex(str: string): string {
    let result = '';
    for (let i=0; i < str.length; i++) {
      result += str.charCodeAt(i).toString(16);
    }
    return '0x' + result;
}

function createBlueprint(tokenId: Number, hash: string, creatorName: string) {
    return `{${tokenId}}:{${hash}:${creatorName}}`;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // connect to database
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    let memesToMint;
    // fetch 100 memes from mint queue - todo, filter out memes which use images that require approval
    try {
        const mintQueueCollection = client.db("primary").collection("mintQueue");
        memesToMint = await mintQueueCollection.find({requiredImageApprovals: []}).sort({created: 1}).limit(100).toArray();
    } catch (e) {
        console.error(e);
        res.status(500).send(e.message);
    }

    let serviceMetadata;
    // fetch service metadata (contains minting index)
    try {
        const serviceMetadataCollection = client.db("primary").collection("serviceMetadata");
        serviceMetadata = await serviceMetadataCollection.findOne({docIndex: 1});
    } catch (e) {
        console.error(e);
        res.status(500).send(e.message);
    }

    if (serviceMetadata) {
        // if no memes, then return successful
        if (memesToMint.length == 0) {
            res.status(200).send("success, no memes in queue");
        }

        // create mint payload object
        let payload: ImmutableMethodParams.ImmutableOffchainMintV2ParamsTS = [
            {
              contractAddress: process.env.NEXT_PUBLIC_DANKMINTER_COLLECTION_CONTRACT_ADDRESS,
              users: [],
            },
          ];

        // get starting tokenId
        let tokenId = serviceMetadata.mintingIndex;

        // create array for new meme metadata so it can be inserted at once
        let newMemeMetadata = [];

        // create array for meme links so they can be inserted at once
        let newMemeLinks = [];

        let deleteFromMintQueue = [];
        // for each meme to mint
        memesToMint.forEach((mintRequest: any) => {
            // assign id
            mintRequest.tokenId = tokenId.toString();
            // get meme hash
            let memeHash = mintRequest.hash;
            // create withdraw blueprint
            let blueprint = createBlueprint(mintRequest.tokenId, memeHash, mintRequest.creator);
            // add redirect link to new links array
            newMemeLinks.push(mintRequest.redirectLink);
            // delete link from metadata
            delete mintRequest.redirectLink;
            // delete requiredImageApprovals from metadata
            delete mintRequest.requiredImageApprovals;
            // format metadata for immutableX and add to new metadata array
            newMemeMetadata.push(mintRequest);
            // create mint token object
            const mintToken = {
                id: mintRequest.tokenId.toString(),
                blueprint: blueprint,
                royalties: [ 
                    {
                        recipient: process.env.DANKMINTER_ROYALTY_ADDRESS,
                        percentage: 10,
                    },
                    {
                        recipient: mintRequest.creatorAddress,
                        percentage: 5,
                    }
                ],
            };  
            let userIsInArray = false;
            // if user in payload users array
            payload[0].users.forEach((user) => {
                // add mint token object to user in payload user token array
                if (user.etherKey === mintRequest.creatorAddress.toLowerCase()) {
                    user.tokens.push(mintToken);
                    userIsInArray = true;
                }
            });
            // else
            if (!userIsInArray) {
                // create user object with mint token
                let user = {
                    etherKey: mintRequest.creatorAddress.toLowerCase(),
                    tokens: [mintToken],
                }
                // add user to payload
                payload[0].users.push(user);
            }

            // increment tokenId
            tokenId += 1;

            deleteFromMintQueue.push(mintRequest._id);
        });

        try {
            // send mintV2 request
            const mintRes = await mintNFTs(payload);
    
            const linkCollection = client.db("primary").collection("memelinks");
            const metadataCollection = client.db("primary").collection("metadata");
            // insert all new meme metadata objects
            linkCollection.insertMany(newMemeLinks);
            // insert all new meme links
            metadataCollection.insertMany(newMemeMetadata);
            // increment serviceMetadata.mintingIndex by number of memes successfully minted
            const serviceMetadataCollection = client.db("primary").collection("serviceMetadata");
            await serviceMetadataCollection.updateOne({docIndex: 1}, {$inc: {mintingIndex: newMemeLinks.length}});

            // TODO - increment all meme lineage decendent counts

            // Delete all memes that were minted from queue
            const mintQueueCollection = client.db("primary").collection("mintQueue");
            await mintQueueCollection.remove({ _id: { $in: deleteFromMintQueue} });

            // send success response
            res.status(200).send(`successfully minted ${mintRes.results.length} memes`);
        } catch (e) {
            // TODO - make sure errors are handled so the service doesn't hang
            console.error(e);
            res.status(500).send(e.message);
        }
    } else {
        // return error, metadata not found
        console.error("service metadata not found");
    }
}

// TODO - somehow secure this function so it can only be called by the cron
export default handler;