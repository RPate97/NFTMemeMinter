import { CollectionMeme } from "src/components/MemeCollection/collectionMeme";
import { Box, Flex, Text } from "@chakra-ui/react";
import { EmptyCollection } from "src/components/MemeCollection/emptyCollection";
import { NFTMeme } from "src/utils/types";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { DefaultPage } from 'components/default-page';
import { MarketOrder, UserProfile } from 'src/utils/types';
import { MarketMeme } from 'components/market-meme';
import useAxios from 'axios-hooks';
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
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/assets?user=${account}&collection=${process.env.NEXT_PUBLIC_DANKMINTER_COLLECTION_CONTRACT_ADDRESS}`)
        .then(function (response) {
            setData((prevData) => [...response.data.result]);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  }, [account, page]);

  const [{ data: orders, loading, error }, refetchListings] = useAxios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/orders`,
    params: { 
      page_size: 10,
      order_by: "created_at",
      status: "active",
      sell_token_address: process.env.NEXT_PUBLIC_DANKMINTER_COLLECTION_CONTRACT_ADDRESS
     },
  });

  const addMemeToCollection = (boughtMeme: NFTMeme) => {
    setData((prevData) => [boughtMeme, ...prevData]);
  }
  
  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        <Text color="white" fontSize="4xl" ml={10} mt={3} fontFamily="space_monoregular">
            Your Collection
        </Text>
        <Flex flexDirection="row" maxHeight="410">
          {data && data.length > 0 
            ? data.map((el: NFTMeme) => {
              return el && el.metadata ? <CollectionMeme key={el.metadata.hash} nftMeme={el} userProfile={userProfile} /> : null;
            }) 
            : <EmptyCollection />
          }
        </Flex>
      </Flex>
      <Flex flexDirection="column">
        <Text color="white" fontSize="4xl" ml={10} mt={6} fontFamily="space_monoregular">
            DankMarket
        </Text>
        <Flex flexDirection="row">
          {orders && orders.result && orders.result.length > 0 
              ? <Box
                  padding={2}
                  w="100%"
                  mx="auto"
                  marginTop={4}
                  sx={{ columnCount: [1, 2, 3, 4], columnGap: "8px" }}
              >
                  {orders.result.map((el: MarketOrder) => {
                      return (
                          <MarketMeme 
                            key={el.sell.data.token_id} 
                            order={el} 
                            refetchListings={refetchListings}
                            addMemeToCollection={addMemeToCollection}
                          />
                      )
                  })}             
              </Box> 
          : <></>} 
        </Flex>
      </Flex>
    </Flex>  
  )
}
