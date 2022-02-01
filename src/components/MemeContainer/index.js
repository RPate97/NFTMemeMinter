import React, { useEffect, useState } from 'react'
import { ethers } from "ethers";
import { MemeModal } from 'src/components/MemeCollection/memeModal';
import { useContractCall } from "@usedapp/core";
import abi from 'contracts/dankminter-abi.json';
const axios = require('axios');
// import Web3 from 'web3';

export const MemeContainer = ({account, memeHash}) => {
  // const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const [imageURI, setImageURI] = useState();
  const [data, setData] = useState();
  const CONTRACT_INTERFACE = new ethers.utils.Interface(abi);
  const MEME_ADDRESS = process.env.NEXT_PUBLIC_DANKMINTER_ADDRESS;
  const gateway = "https://dankminter.mypinata.cloud/ipfs/";

  function useMeme() {
    try {
        const meme = useContractCall(memeHash && {
            abi: CONTRACT_INTERFACE, 
            address: MEME_ADDRESS, 
            method: "getMemeWithHash", 
            args: [memeHash.valueOf()]
        });
        if (meme) {
          return meme[0];            
        } else {
          return undefined;
        }
    } catch (e) {
        console.error(e);
    }
  }

  const meme = useMeme();

  useEffect(() => {
    if (meme) {
      async function getData() {
        const data = (await axios.get(meme.uri)).data;
        const newURI = data.image.replace('ipfs://', gateway);
        setImageURI(newURI);  
        setData(data);        
      }
      getData();
    }
  }, [meme]);

  return (
    <>
      {meme && imageURI && data ? (<MemeModal 
        userAddress={account}
        isOpen={true}
        onClose={() => {}}
        hash={meme.memeHash}
        score={meme.score}
        postings={meme.postings} 
        memeId={meme.id}
        danknessTier={meme.danknessTier}
        experience={meme.experience}
        requiredExperience={meme.requiredExperience}
        imageURI={imageURI} 
        name={data.name}
        description={data.description} 
        creatorName={data.attributes[0].value}
        printNum={data.attributes[1].value}
        creationDate={data.attributes[2].value}
        totalMinted={data.attributes[3].value}
      />) : null}
    </>
  )
}