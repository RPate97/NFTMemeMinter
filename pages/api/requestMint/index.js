import playwright from 'playwright';
import withAuth from "middleware/auth";
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
  
async function hashIsUnique(memeHash, client, abi) {
    try {
        // check mint queue for hash
        const mintQueueCollection = client.db("primary").collection("mintQueue");
        const memeToMint = await mintQueueCollection.findOne({memeHash: {$eq: memeHash}});
        if (memeToMint?.memeHash) {
            return false;
        } else {
            // check blockchain for hash
            const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_DANKMINTER_ADDRESS;
            const provider = new ethers.providers.JsonRpcProvider();
            const signer = provider.getSigner();
            const dankMinter = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
            const resp = await dankMinter.isOriginalHash(memeHash);
            const isUnique = resp[0];
            return isUnique;
        }
    } catch (e) {
        console.error(e);
        return false;
    }
}

async function hasAvailableTreeFiddyBalance(userAddress, client, abi) {
    try {
        const userCollection = client.db("primary").collection("users");
        const user = await userCollection.findOne({address: {$eq: userAddress}});
        if (user) {
            const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TREE_FIDDY_ADDRESS;
            const provider = new ethers.providers.JsonRpcProvider();
            const signer = provider.getSigner();
            const dankMinter = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
            let officialBalance;
            if (user.mintedBefore === false) {
                officialBalance = ethers.BigNumber.from("210000000000000000000");
            } else {
                officialBalance = await dankMinter.balanceOf(userAddress);
            }
            const availableBalance = officialBalance.sub(web3.utils.toWei(user.reservedTreeFiddyBalance.toString(), "ether"));
            const weiRequirement = web3.utils.toWei("35", "ether");
            if (availableBalance.gte(weiRequirement)) {
                return [true, user.reservedTreeFiddyBalance, officialBalance, user.mintedBefore];
            } else {
                return [false, user.reservedTreeFiddyBalance, officialBalance, user.mintedBefore];
            }
        } else {
            return [false, -1, -1];
        }
    } catch (e) {
        console.error(e);
        return [false, -1, -2, e];
    }
}

const handler = async(req, res) => {
    // get contract abi
    const contractsDirectory = path.resolve(process.cwd(), "contracts");
    const abi = fs.readFileSync(
        path.join(contractsDirectory, "dankminter-abi.json"),
        "utf8"
    );

    // TODO - validate all inputs

    // get template id from request
    let templateId = req.body.state.templateId;
    let state = req.body.state;
    // TODO - fetch template info from backend and make image with that info

    // connect to db
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    // check available tree fiddy balance
    const hasAvailableBalance = await hasAvailableTreeFiddyBalance(req.user, client, abi);
    if (!hasAvailableBalance[0]) {
        if (hasAvailableBalance[1] === -1) {
            if (hasAvailableBalance[2] === -1) {
                return res.status(404).send("error, user not found");
            } else {
                return res.status(500).send(hasAvailableBalance[3]);
            }
        } else {
            return res.status(410).send({message: "error, does not have available balance", balance: hasAvailableBalance[2], reserved: hasAvailableBalance[1]});
        }
    }
    let mintedBefore;
    if (hasAvailableBalance.length === 1) {
        mintedBefore = false;
    } else {
        mintedBefore = hasAvailableBalance[3];
    }

    // get overlay captions
    let captions = [];
    req.body.state.textLocations.forEach((el) => {
        captions.push(el.text);
    });
    captions.push(req.body.state.mainCaption);

    // concat captions
    var textStr = "";
    for (var i = 0; i < captions.length; i++) {
        textStr += captions[i];
    }
    // calculate hash
    const encoded = web3.eth.abi.encodeParameters(['uint256', 'string'], [templateId, textStr])
    const memeHash = web3.utils.sha3(encoded, {encoding: 'hex'});

    // check if hash is unique
    const isUnique = await hashIsUnique(memeHash, client, abi);
    if (!isUnique) {
        await client.close();
        return res.status(409).send("error, meme hash is not unique");
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

    // create metadata object
    let currentTime = Date.now();
    let metadata = {
        name: req.body.name,
        description: `A gloriously dank meme created by ${req.body.name} and minted with DankMinter. Mint your own unique NFT memes at https://www.dankminter.com`,
        image: `ipfs://${ipfsHash}`,
        attributes: [
            {
                trait_type: "Creator", 
                value: req.handle,
            }, 
            {
                display_type: "date", 
                trait_type: "Creation Date", 
                value: currentTime,
            },
            {
                trait_type: "Total Minted",
                value: 1
            }
        ],
        memeHash: memeHash,
    };

    let mintRequest = {
        metadata: metadata,
        memeHash: memeHash,
        state: state,
        captions: captions,
        mintToAddress: req.user,
        created: currentTime,
        mintedBefore: mintedBefore,
    }

    // insert into mint queue
    try {
      const mintQueueCollection = client.db("primary").collection("mintQueue");
      await mintQueueCollection.insertOne(mintRequest);
    } catch(e) {
      console.error(e);
      // TODO - handle reverting image pin + metadata update
      return res.status(500).json({ error: e.message })
    }
    
    // increase reserved tree fiddy balance
    const userCollection = client.db("primary").collection("users");
    await userCollection.updateOne({address: {$eq: req.user}}, {$inc : {reservedTreeFiddyBalance: 35}});        

    await client.close();
    return res.status(200).json({ message: "success, mint request queued", imageURI: `https://dankminter.mypinata.cloud/ipfs/${ipfsHash}`});
}

export default withAuth(handler);