import Head from 'next/head';
import { useEthers } from "@usedapp/core";
import { useEffect } from 'react';
import { styles } from 'styles/styles.js';
import { WalletBar } from 'components/common-ui/wallet-bar';
import { ethers } from "ethers";
import { useContractCall } from "@usedapp/core";
import abi from 'contracts/dankminter-abi.json';
import { CollectionMeme } from "components/MemeCollection/collectionMeme";
import { Button, Box, Text, Spacer, Flex } from "@chakra-ui/react";

export function MemeCollection() {
  const {activateBrowserWallet, account } = useEthers();
  const CONTRACT_INTERFACE = new ethers.utils.Interface(abi);
  const MEME_ADDRESS = '0xcfeb869f69431e42cdb54a4f4f105c19c080a601'

  function useUsersMemes() {
      try {
          const usersMemes = useContractCall(account && {
              abi: CONTRACT_INTERFACE, 
              address: MEME_ADDRESS, 
              method: "getUsersMemes", 
              args: [account]
          });
          console.log(usersMemes);
          return usersMemes;            
      } catch (e) {
          console.error(e);
      }
  }

  const memes = useUsersMemes();

  return (
    <div>
      <Head>
        <title>NFT Meme Minter</title>
        <meta name="description" content="The only meme generator that mints your memes as NFTs." />
        <meta name="google" content="notranslate" />
      </Head>

      <main style={styles.main}>
        <WalletBar />
        <Flex width="100vw" height="100vh" margin="5">
          {memes && memes[0].map((el) => (
            <CollectionMeme key={el.memeHash} hash={el.memeHash} score={el.score} uri={el.uri} postings={el.postings} memeId={el.memeId} />
          ))}          
        </Flex>
      </main>
    </div>
  )
}
