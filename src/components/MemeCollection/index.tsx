import { CollectionMeme } from "src/components/MemeCollection/collectionMeme";
import { Box } from "@chakra-ui/react";
import { EmptyCollection } from "src/components/MemeCollection/emptyCollection";
import { NFTMeme } from "src/utils/types";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { DefaultPage } from 'components/default-page';
import { UserProfile } from 'src/utils/types';
const axios = require('axios');

type Props = {
  account: string,
  activateBrowserWallet: () => void,
  deactivate: () => void,
  doneConnecting: boolean,
  setDoneConnecting: Dispatch<SetStateAction<boolean>>,
  token: string,
  setToken: Dispatch<SetStateAction<string>>,
  userProfile: UserProfile,
  setUserProfile: Dispatch<SetStateAction<UserProfile | null>>,
  getUserProfile: (userToken: string) => Promise<void>,
}

export const MemeCollection: React.FC<Props> = (props) => {
  const {account, deactivate, userProfile} = props;
  const [page, setPage] = useState(1)
  const [data, setData] = useState([]);

  useEffect(() => {
    if (account) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/assets?user=${userProfile.address}&collection=${process.env.NEXT_PUBLIC_DANKMINTER_COLLECTION_CONTRACT_ADDRESS}&pate=${page}`)
        .then(function (response) {
            console.log(response);
            setData((prevData) => [...prevData, response.result]);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  }, [account]);
  
  return (
    <>
      {data.length > 0 ? <Box
        padding={2}
        w="100%"
        mx="auto"
        marginTop={4}
        sx={{ columnCount: [1, 2, 3, 4], columnGap: "8px" }}
      >
        {data.map((el: NFTMeme) => {
          console.log(el)
          return el && el.metadata ? <CollectionMeme key={el.metadata.hash} nftMeme={el} userProfile={userProfile} /> : null;
        })}             
      </Box> : <EmptyCollection />}    
    </>  
  )
}
