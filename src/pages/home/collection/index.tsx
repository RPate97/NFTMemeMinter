import { CollectionMeme } from "src/pages/home/collection/collectionMeme";
import { Box, Flex, Text, Link, Button } from "@chakra-ui/react";
import { EmptyCollection } from "src/pages/home/collection/emptyCollection";
import { NFTMeme } from "src/utils/types";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { DefaultPage } from 'components/default-page';
import { MarketOrder, UserProfile } from 'src/utils/types';
import { ChevronRightIcon } from "@chakra-ui/icons";
const axios = require('axios');

type Props = {
  account: string,
  activateBrowserWallet: () => void,
  data: NFTMeme[],
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
  return (
    <Flex flexDirection="column" width="100%">
      <Flex flexDirection="row" alignItems="center" height="80px">
        <Text color="white" fontSize="4xl" ml={5} mr={3} fontFamily="space_monoregular">
            Dank Collection
        </Text>          
        <Button
          bg="transparent"
          border="1px solid transparent"
          _hover={{
              border: "1px",
              borderStyle: "solid",
              borderColor: "white",
              backgroundColor: "gray.700",
          }}
          borderColor="gray.700"
          borderRadius="xl"
          m="0px"
          mr="5px"
          px={0}
          height="30px">
          <Link href='/collection' passHref>
              <ChevronRightIcon color="white" boxSize="2em" />                                     
          </Link>
      </Button> 
      </Flex>
      <Flex 
        flexDirection="row" 
        maxHeight="560"
        alignContent="start"   
        position="sticky"
        top="0"
        alignItems="center"
        flexWrap="nowrap"
        overflowX="scroll"
        px="2"
        gridGap="2"
        css={{
            WebkitOverflowScrolling: "touch",
            msOverflowStyle: "-ms-autohiding-scrollbar",
            overscrollBehaviorX: "contain",
        }}
        pb={5} 
      >
        {props.data && props.data.length > 0 
          ? props.data.map((el: NFTMeme) => {
            return el && el.metadata ? <CollectionMeme key={el.metadata.hash} nftMeme={el} userProfile={props.userProfile} /> : null;
          }) 
          : <EmptyCollection />
        }
        {props.data && props.data.length > 0 && <Box height="350px">
          <Flex flexDirection="column" height="100%" justifyContent="center">
            <Button
              bg="transparent"
              border="1px solid transparent"
              _hover={{
                  border: "1px",
                  borderStyle: "solid",
                  borderColor: "white",
                  backgroundColor: "gray.700",
              }}
              borderColor="gray.700"
              borderRadius="xl"
              m="0px"
              mx={5}
              px={0}
              height="40px">
                <Link href='/' passHref>
                    <Text color="white" fontSize="md" py={5} px={3} m={0}>
                        View All
                    </Text>                                      
                </Link>
            </Button> 
          </Flex>
        </Box>}
      </Flex>
    </Flex>
  )
}
