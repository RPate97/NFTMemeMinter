import { styles } from 'styles/styles.js';
import { WalletBar } from 'components/common-ui/wallet-bar';
import { ethers } from "ethers";
import { useContractCall } from "@usedapp/core";
import abi from 'contracts/dankminter-abi.json';
import { CollectionMeme } from "components/MemeCollection/collectionMeme";
import { Flex } from "@chakra-ui/react";
import { Header } from "components/common-ui/header";
import { EmptyCollection } from "components/MemeCollection/emptyCollection";

export function MemeCollection({account, deactivate}) {
  const CONTRACT_INTERFACE = new ethers.utils.Interface(abi);
  const MEME_ADDRESS = process.env.NEXT_PUBLIC_DANKMINTER_ADDRESS;
  
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
      <Header title="Collection"/>
      <main style={styles.main}>
        <WalletBar account={account} deactivate={deactivate} />
        <Flex width="100vw" height="100vh" margin="5">
          {memes && memes[0].length > 0 ? memes[0].map((el) => (
            <CollectionMeme key={el.memeHash} hash={el.memeHash} score={el.score} uri={el.uri} postings={el.postings} memeId={el.memeId} userAddress={account} />
          )) : <EmptyCollection />}       
        </Flex>
      </main>
    </div>
  )
}
