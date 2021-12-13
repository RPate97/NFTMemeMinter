
import React, { useState, useEffect } from 'react';
import { Button, Box, Text } from "@chakra-ui/react";
import { Identicon } from "components/common-ui/wallet-bar/identicon";
import { CollectionButton } from "components/common-ui/wallet-bar/collectionButton";
import { Flex, Spacer } from "@chakra-ui/react";
import { Logo } from "components/common-ui/logo";
import { AppColors } from "styles/styles";
import { TossACoin } from "components/common-ui/wallet-bar/tossACoin";
import { MintButton } from "components/common-ui/wallet-bar/mintButton";
import { PlayerDankness } from "components/common-ui/wallet-bar/danknessTier"; 
import { ImmutableXClient } from '@imtbl/imx-sdk';
import { ERC721TokenType, ETHTokenType, Branded, EthAddressBrand } from '@imtbl/imx-sdk';
import { DankBookButton } from './dankbook';
import { IMXBalanceButton } from './imxBalanceButton';

export const ButtonBar = ({handleOpenModal, userProfile, account}) => {
    const [balances, setBalances] = useState([]);

    useEffect(() => {
        async function setup() {
            const client = await ImmutableXClient.build({ publicApiUrl: process.env.NEXT_PUBLIC_IMX_API_ADDRESS });
            const balances = await client.listBalances({user: account, symbols: ['IMX', 'ETH']});
            setBalances(balances.result);            
        }
        if (account) {
            setup();
        }
    }, [account])

    return (
        <div style={{position: "sticky", top: 0}}>
            <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                h="75">
                <Logo />
                <Spacer />
                {/* <PlayerDankness account={account} /> */}
                {account && <Box display="flex"
                    height="20"
                    alignItems="start"
                    marginRight="4">
                    <Flex direction="column" justify="end">
                        <Flex direction="row" mt="5">
                            <DankBookButton />
                            <MintButton />  
                            <Box
                                ml="1.5"
                                display="flex"
                                alignItems="center"
                                border="1px"
                                borderColor="gray.700"
                                borderRadius="xl"
                                py="0">
                                <CollectionButton userAddress={account}/>
                                {balances && <IMXBalanceButton imxBalance={balances.length !== 0 ? balances[0] : 0} />}
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
                    </Flex>                
                </Box>}
            </Flex>   
        </div>
    )
}