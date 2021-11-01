
import React, { useState } from 'react';
import { useEthers } from "@usedapp/core";
import { Button, Box, Text, Tooltip } from "@chakra-ui/react";
import { Identicon } from "components/common-ui/wallet-bar/identicon";
import { CollectionButton } from "components/common-ui/wallet-bar/collectionButton";
import { Flex, Spacer } from "@chakra-ui/react";
import { Logo } from "components/common-ui/logo";
import { AppColors } from "styles/styles";
import { TossACoin } from "components/common-ui/wallet-bar/tossACoin";
import { TreeFiddyButton } from 'components/common-ui/wallet-bar/TreeFiddyButton';
import { useTokenBalance } from '@usedapp/core';
import { VoteButton } from "components/common-ui/wallet-bar/voteButton";
import { MintButton } from "components/common-ui/wallet-bar/mintButton";
import { useDisclosure } from "@chakra-ui/react";
import { PlayerDankness } from "components/common-ui/wallet-bar/danknessTier"; 

import Web3 from 'web3';
const axios = require('axios');

export const ButtonBar = ({handleOpenModal, account}) => {
    let treeFiddyBalance = useTokenBalance(process.env.NEXT_PUBLIC_TREE_FIDDY_ADDRESS, account);
    const [token, setToken] = useState(() => {
        if (typeof(Storage) !== "undefined") {
          // Code for localStorage/sessionStorage.
          return localStorage.getItem("token");
        } else {
          // Sorry! No Web Storage support..
          return null;
        }
    });

    return (
        <div style={{position: "sticky", top: 0}}>
            <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                h="75">
                <Logo />
                <Spacer />
                <PlayerDankness account={account} />
                <Box display="flex"
                    height="20"
                    alignItems="center"
                    marginRight="4">
                    <Flex direction="column" justify="flex-end">
                        <Flex direction="row" mt="8">
                            <Box
                                ml="auto"
                                display="flex"
                                alignItems="center"
                                border="1px"
                                borderColor="gray.700"
                                borderRadius="xl"
                                py="0">
                                <CollectionButton userAddress={account}/>
                                <TreeFiddyButton treeFiddyBalance={treeFiddyBalance} />
                                <Button
                                    bg={AppColors.buttonBackground}
                                    border="1px solid transparent"
                                    _hover={{
                                        border: "1px",
                                        borderStyle: "solid",
                                        borderColor: "white",
                                        backgroundColor: "gray.700",
                                    }}
                                    onClick={handleOpenModal}
                                    borderRadius="xl"
                                    m="0px"
                                    px={3}
                                    height="38px"
                                >
                                    <Text color="white" fontSize="md" fontWeight="medium" mr="2">
                                    {account &&
                                        `${account.slice(0, 6)}...${account.slice(
                                        account.length - 4,
                                        account.length
                                        )}`}
                                    </Text>
                                    <Identicon account={account}/>
                                </Button>
                            </Box>                         
                        </Flex>
                        <Flex direction="row" mt="8px">
                            <TossACoin treeFiddyBalance={treeFiddyBalance}/>
                            <VoteButton />
                            <MintButton />                            
                        </Flex>
                    </Flex>                
                </Box>
            </Flex>   
        </div>
    )
}