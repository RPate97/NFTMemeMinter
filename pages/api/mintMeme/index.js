const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);
const { Readable } = require('stream');
const { ethers } = require("ethers");
const fs = require("fs");
import playwright from 'playwright';

async function mintMemeViaContract(templateId, text, URI) {
    const CONTRACT_ADDRESS = "0xcfeb869f69431e42cdb54a4f4f105c19c080a601";
    const OWNER_ADDRESS = "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0"; // send to address
    const infuraKey = process.env.INFURA_KEY;
    const abi = [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "poster",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "memeId",
            "type": "uint256"
          }
        ],
        "name": "AddedPosting",
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
            "internalType": "address",
            "name": "deleter",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "memeId",
            "type": "uint256"
          }
        ],
        "name": "DeletedPosting",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "source",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "memeId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "danknessTier",
            "type": "uint256"
          }
        ],
        "name": "LeveledUpDankness",
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
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "uri",
            "type": "string"
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
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "address payable",
                "name": "account",
                "type": "address"
              },
              {
                "internalType": "uint96",
                "name": "value",
                "type": "uint96"
              }
            ],
            "indexed": false,
            "internalType": "struct LibPart.Part[]",
            "name": "royalties",
            "type": "tuple[]"
          }
        ],
        "name": "RoyaltiesSet",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "sacrificer",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "memeId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Sacrificed",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "treeFiddyCoin",
            "type": "address"
          }
        ],
        "name": "SetTreeFiddyCoinAddress",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "memeId",
            "type": "uint256"
          }
        ],
        "name": "Tipped",
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
            "name": "operator",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "TransferTreeFiddies",
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
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "voter",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "memeId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "memeScore",
            "type": "uint256"
          }
        ],
        "name": "VotedOnMeme",
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
            "components": [
              {
                "internalType": "uint32",
                "name": "templateId",
                "type": "uint32"
              },
              {
                "internalType": "string[]",
                "name": "text",
                "type": "string[]"
              },
              {
                "internalType": "string",
                "name": "uri",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "mintToAddress",
                "type": "address"
              }
            ],
            "internalType": "struct DankMinter.MemeToCreate[]",
            "name": "_memesToMint",
            "type": "tuple[]"
          }
        ],
        "name": "batchMintMemes",
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
            "internalType": "string",
            "name": "_uri",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "_mintToAddress",
            "type": "address"
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
            "components": [
              {
                "internalType": "bytes32",
                "name": "memeHash",
                "type": "bytes32"
              },
              {
                "internalType": "string",
                "name": "uri",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "memeId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "score",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "danknessTier",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "experience",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "creator",
                "type": "address"
              },
              {
                "internalType": "string[]",
                "name": "postings",
                "type": "string[]"
              }
            ],
            "internalType": "struct DankMinter.Meme",
            "name": "",
            "type": "tuple"
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
            "components": [
              {
                "internalType": "bytes32",
                "name": "memeHash",
                "type": "bytes32"
              },
              {
                "internalType": "string",
                "name": "uri",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "memeId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "score",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "danknessTier",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "experience",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "creator",
                "type": "address"
              },
              {
                "internalType": "string[]",
                "name": "postings",
                "type": "string[]"
              }
            ],
            "internalType": "struct DankMinter.Meme",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256[]",
            "name": "_memeIds",
            "type": "uint256[]"
          }
        ],
        "name": "getMemes",
        "outputs": [
          {
            "components": [
              {
                "internalType": "bytes32",
                "name": "memeHash",
                "type": "bytes32"
              },
              {
                "internalType": "string",
                "name": "uri",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "memeId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "score",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "danknessTier",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "experience",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "creator",
                "type": "address"
              },
              {
                "internalType": "string[]",
                "name": "postings",
                "type": "string[]"
              }
            ],
            "internalType": "struct DankMinter.Meme[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_userAddress",
            "type": "address"
          }
        ],
        "name": "getNumStashedMemes",
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
            "name": "id",
            "type": "uint256"
          }
        ],
        "name": "getRaribleV2Royalties",
        "outputs": [
          {
            "components": [
              {
                "internalType": "address payable",
                "name": "account",
                "type": "address"
              },
              {
                "internalType": "uint96",
                "name": "value",
                "type": "uint96"
              }
            ],
            "internalType": "struct LibPart.Part[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_userAddress",
            "type": "address"
          }
        ],
        "name": "getUsersMemes",
        "outputs": [
          {
            "components": [
              {
                "internalType": "bytes32",
                "name": "memeHash",
                "type": "bytes32"
              },
              {
                "internalType": "string",
                "name": "uri",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "memeId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "score",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "danknessTier",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "experience",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "creator",
                "type": "address"
              },
              {
                "internalType": "string[]",
                "name": "postings",
                "type": "string[]"
              }
            ],
            "internalType": "struct DankMinter.Meme[]",
            "name": "",
            "type": "tuple[]"
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
            "name": "_owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_operator",
            "type": "address"
          }
        ],
        "name": "isApprovedForAll",
        "outputs": [
          {
            "internalType": "bool",
            "name": "isOperator",
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
        "inputs": [
          {
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
          }
        ],
        "name": "notOnMintCooldown",
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
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "royalties",
        "outputs": [
          {
            "internalType": "address payable",
            "name": "account",
            "type": "address"
          },
          {
            "internalType": "uint96",
            "name": "value",
            "type": "uint96"
          }
        ],
        "stateMutability": "view",
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
            "internalType": "uint256",
            "name": "_memeId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "sacrificeToMeme",
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
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          },
          {
            "internalType": "address payable",
            "name": "_royaltiesReceipientAddress",
            "type": "address"
          },
          {
            "internalType": "uint96",
            "name": "_percentageBasisPoints",
            "type": "uint96"
          }
        ],
        "name": "setRoyalties",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_contractAddr",
            "type": "address"
          }
        ],
        "name": "setTreeFiddyCoinAddress",
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
            "name": "_memeId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "tipCreator",
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
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "tossACoin",
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
            "internalType": "address payable",
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
    ];

    // ethers.js
    const provider = new ethers.providers.JsonRpcProvider();
    console.log("got provider");
    const signer = provider.getSigner();
    const dankMinter = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    const resp = await dankMinter.createMeme(templateId, text, URI, OWNER_ADDRESS);
    console.log("NFT meme minted:", resp);
}

function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Done waiting");
      resolve(ms)
    }, ms )
  })
}  

async function renderImage(state) {
  const browser = await playwright['chromium'].launch();
  // Create a page with the Open Graph image size best practise
  const page = await browser.newPage({
      viewport: {
          width: state.memeWidth + 50,
          height: state.memeHeight + 150,
      }
  });

  // Generate the full URL out of the given path (GET parameter)
  const url = "localhost:3000/memeTemplate?state=" + encodeURIComponent(JSON.stringify(state));
  console.log(url);
  await page.goto(url, {
      timeout: 30 * 1000
  })

  await wait(100);

  const data = await page.screenshot()
  await browser.close()
  fs.writeFileSync("/tmp/temp.png", data);
  return fs.createReadStream('/tmp/temp.png');     
}

export default async function handler(req, res) {
    // const base64URL = req.query.base64URL;
    // const metadata = req.query.metadata;
    // console.log(req.body.base64Meme);
    console.log(req.body.captions);
    console.log(req.body.templateId);
    console.log(req.body.name);

    const imgStream = await renderImage(req.body.state);
    // const imgBuffer = Buffer.from(req.body.base64Meme.replace(/^data:image\/png;base64,/, ""), 'base64')
    // fs.writeFileSync("/tmp/temp.png", imgBuffer);
    // const readableStreamForFile = fs.createReadStream('/tmp/temp.png');

    // const stream = Readable.from(imgBuffer.toString());
    // stream.path = "test.png";
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
    let ipfsHash = await pinata.pinFileToIPFS(imgStream, options).then((result) => {
        //handle results here
        console.log(result);
        fs.unlink('/tmp/temp.png', () => {console.info("deleted temporary file")});
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