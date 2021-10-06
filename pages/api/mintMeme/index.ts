const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);
const { Readable } = require('stream');
const Web3 = require('web3');

async function mintMemeViaContract(templateId, text, URI) {
    const CONTRACT_ADDRESS = "0xcf3A926931a32BaeC3f0af21814EAE3D1a0AEAa1";
    const OWNER_ADDRESS = "0xC6f9519F8e2C2be0bB29A585A894912Ccea62Dc8";
    const infuraKey = process.env.INFURA_KEY;
    // const web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${process.env.INFURA_KEY}`));
    const web3 = new Web3('https://matic-mumbai.chainstacklabs.com');
    const memeMachine = new web3.eth.Contract([
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "approved",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "ApprovalForAll",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "memeHash",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "BurnedMeme",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "bytes32",
              "name": "memeHash",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "NewMeme",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "Paused",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "Unpaused",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "cooldownTime",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "cooldownType",
              "type": "string"
            }
          ],
          "name": "UpdatedCooldownTime",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            }
          ],
          "name": "UpdatedVotingPrice",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_memeId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "posting",
              "type": "string"
            }
          ],
          "name": "addPosting",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "hURI",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "memeHash",
              "type": "bytes32"
            }
          ],
          "name": "addWhitelistedMemeURI",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "burn",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint32",
              "name": "_templateId",
              "type": "uint32"
            },
            {
              "internalType": "string[]",
              "name": "_text",
              "type": "string[]"
            },
            {
              "internalType": "bytes32",
              "name": "imgHash",
              "type": "bytes32"
            },
            {
              "internalType": "string",
              "name": "_uri",
              "type": "string"
            }
          ],
          "name": "createMeme",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "getApproved",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getCooldownTime",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getCreationCooldownTime",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_memeId",
              "type": "uint256"
            }
          ],
          "name": "getMeme",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            },
            {
              "internalType": "string[]",
              "name": "",
              "type": "string[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_memeHash",
              "type": "bytes32"
            }
          ],
          "name": "getMemeWithHash",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_imgHash",
              "type": "bytes32"
            }
          ],
          "name": "getMemeWithImageHash",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getUsersMemes",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getVoteCooldownTime",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            }
          ],
          "name": "isApprovedForAll",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint32",
              "name": "_templateId",
              "type": "uint32"
            },
            {
              "internalType": "string[]",
              "name": "_text",
              "type": "string[]"
            }
          ],
          "name": "isOriginalMeme",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "ownerOf",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "pause",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "paused",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_memeId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "removePosting",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_salePrice",
              "type": "uint256"
            }
          ],
          "name": "royaltyInfo",
          "outputs": [
            {
              "internalType": "address",
              "name": "receiver",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "royaltyAmount",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "setApprovalForAll",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "tokenURI",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "unpause",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_newCooldownTime",
              "type": "uint256"
            }
          ],
          "name": "updateCreationCooldownTime",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_royalties",
              "type": "uint256"
            }
          ],
          "name": "updateRoyalties",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_newCooldowntime",
              "type": "uint256"
            }
          ],
          "name": "updateVotingCooldownTime",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "imgHash",
              "type": "bytes32"
            }
          ],
          "name": "verifyOriginalImage",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_memeId",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "upDown",
              "type": "bool"
            }
          ],
          "name": "voteOnMeme",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ], CONTRACT_ADDRESS);
  
    const imgHash = web3.utils.padLeft(web3.utils.asciiToHex("12345"), 32);

    // calculate meme hash
    var textStr = "";
    for (var i = 0; i < text.length; i++) {
        textStr += text[i];
    }
    const encoded = web3.eth.abi.encodeParameters(['uint256', 'string'], [templateId, textStr])
    const hash = web3.utils.sha3(encoded, {encoding: 'hex'});

    // calculate uri hash
    const encodedURI = web3.eth.abi.encodeParameters(['string'], [URI]);
    const hURI = web3.utils.sha3(encodedURI, {encoding: 'hex'});
  
    // whitelist uri
    // await memeMachine.addWhitelistedMemeURI(hURI, hash);
    await memeMachine.methods.addWhitelistedMemeURI(hURI, hash).call({from: OWNER_ADDRESS}, function(error, result){
        console.error(error);
        console.info(result);
    });
    console.log("whitelisted");
    // create meme
    // await memeMachine.createMeme(templateId, text, imgHash, URI);
    await memeMachine.methods.createMeme(templateId, text, imgHash, URI).call({from: OWNER_ADDRESS}, function(error, result){
        console.error(error);
        console.info(result);
    });
    console.log("NFT meme minted!");
    const resp = await memeMachine.getMeme(1);
    console.log(resp);
}

export default async function handler(req, res) {
    // const base64URL = req.query.base64URL;
    // const metadata = req.query.metadata;
    console.log(req.body.base64Meme);
    console.log(req.body.captions);
    console.log(req.body.templateId);
    console.log(req.body.name);

    const imgBuffer = Buffer.from(req.body.base64Meme, 'base64')
    console.log("made buffer");
    const stream = Readable.from(imgBuffer.toString());
    console.log("made stream, initiating pin");
    stream.path = "test.png";
    // pin file
    const options = {
        pinataMetadata: {
            name: req.body.name,
            keyvalues: {}
        },
        pinataOptions: {
            cidVersion: 0
        }
    };
    let ipfsHash = await pinata.pinFileToIPFS(stream, options).then((result) => {
        //handle results here
        console.log(result);
        return result.IpfsHash;
    }).catch((err) => {
        //handle error here
        console.log(err);
    });

    let metadata = {
        name: req.body.name,
        description: req.body.description,
        image: `ipfs://${ipfsHash}`,
        attributes: [
            {
                trait_type: "Creator", 
                value: "Pate"
            }, 
            {
                trait_type: "Print Number", 
                value: 1
            }, 
            {
                display_type: "date", 
                trait_type: "creation date", 
                value: Date.now(),
            },
            {
                trait_type: "Total Minted",
                value: 1
            }
        ],
    };

    const metadataBuffer = Buffer.from(JSON.stringify(metadata, null, 2), "utf-8");
    console.log("made metadata buffer");
    const metadatastream = Readable.from(metadataBuffer.toString());
    console.log("made metadata stream, initiating pin");
    metadatastream.path = "test-metadata.png";

    const metadataOptions = {
        pinataMetadata: {
            name: `metadata-${req.body.name}`,
            keyvalues: {}
        },
        pinataOptions: {
            cidVersion: 0
        }
    };
    let metadataIpfsHash = await pinata.pinFileToIPFS(metadatastream, metadataOptions).then((result) => {
        //handle results here
        console.log(result);
        return result.IpfsHash;
    }).catch((err) => {
        //handle error here
        console.log(err);
    });

    // mint meme with metadata
    const nftMetadataURI = `ipfs://${metadataIpfsHash}`;
    await mintMemeViaContract(0, req.body.captions, nftMetadataURI);
}