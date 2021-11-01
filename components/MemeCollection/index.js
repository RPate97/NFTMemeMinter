import { styles } from 'styles/styles.js';
import { WalletBar } from 'components/common-ui/wallet-bar';
import { ethers } from "ethers";
import { useContractCall } from "@usedapp/core";
import abi from 'contracts/dankminter-abi.json';
import { CollectionMeme } from "components/MemeCollection/collectionMeme";
import { Box } from "@chakra-ui/react";
import { Header } from "components/common-ui/header";
import { EmptyCollection } from "components/MemeCollection/emptyCollection";

export function MemeCollection({account, deactivate}) {
  const CONTRACT_INTERFACE = new ethers.utils.Interface(abi);
  const MEME_ADDRESS = process.env.NEXT_PUBLIC_DANKMINTER_ADDRESS;
  
  function useUsersMemes() {
    console.log("account:");
    console.log(account);
    try {
      const usersMemes = useContractCall({
          abi: CONTRACT_INTERFACE, 
          address: MEME_ADDRESS, 
          method: "getUsersMemes", 
          args: [account]
      });
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
        {memes && memes[0].length > 0 ? <Box
          padding={2}
          w="100%"
          mx="auto"
          sx={{ columnCount: [1, 2, 3, 4], columnGap: "8px" }}
        >
          {memes[0].map((el) => {
            console.log(el.requiredExperience);
            return (
              <CollectionMeme key={el.memeHash} hash={el.memeHash} score={el.score} uri={el.uri} postings={el.postings} memeId={el.memeId} userAddress={account} experience={el.experience} requiredExperience={el.requiredExperience} danknessTier={el.danknessTier} />
            )
          })}             
        </Box> : <EmptyCollection />}
      </main>
    </div>
  )
}
