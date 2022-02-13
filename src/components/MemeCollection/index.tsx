import { styles } from 'styles/styles.js';
import { WalletBar } from 'src/components/common-ui/wallet-bar';
import { CollectionMeme } from "src/components/MemeCollection/collectionMeme";
import { Box, Flex } from "@chakra-ui/react";
import { Header } from "src/components/common-ui/header";
import { EmptyCollection } from "src/components/MemeCollection/emptyCollection";
import { useEffect, useState } from "react";
import useAxios from 'axios-hooks';
import { NFTMeme } from "src/utils/types";

export function MemeCollection({account, deactivate, userProfile}) {
  const [page, setPage] = useState(1)
  const [{ data, loading, error }] = useAxios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/assets`,
    params: { 
      user: userProfile.address,
      collection: process.env.NEXT_PUBLIC_DANKMINTER_COLLECTION_CONTRACT_ADDRESS
     },
  });
  
  return (
    <div>
      <Header title="Collection"/>
      <main style={styles.main}>
        <Flex flexDirection="column">
          <WalletBar account={account} deactivate={deactivate} userProfile={userProfile} />
          {data && data.result && data.result.length > 0 ? <Box
            padding={2}
            w="100%"
            mx="auto"
            marginTop={4}
            sx={{ columnCount: [1, 2, 3, 4], columnGap: "8px" }}
          >
            {data.result.map((el: NFTMeme) => {
              return (
                <CollectionMeme key={el.metadata.hash} nftMeme={el} userProfile={userProfile} />
              )
            })}             
          </Box> : <EmptyCollection />}
        </Flex>
      </main>
    </div>
  )
}
