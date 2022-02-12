
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button, Box, Text } from "@chakra-ui/react";
import { Identicon } from "src/components/common-ui/wallet-bar/identicon";
import { CollectionButton } from "src/components/common-ui/wallet-bar/collectionButton";
import { Flex, Spacer } from "@chakra-ui/react";
import { Logo } from "src/components/common-ui/logo";
import { AppColors } from "styles/styles";
import { TossACoin } from "src/components/common-ui/wallet-bar/tossACoin";
import { MintButton } from "src/components/common-ui/wallet-bar/mintButton";
import { PlayerDankness } from "src/components/common-ui/wallet-bar/danknessTier"; 
import { ImmutableMethodResults, ImmutableXClient } from '@imtbl/imx-sdk';
import { ERC721TokenType, ETHTokenType, EthAddressBrand } from '@imtbl/imx-sdk';
import { DankBookButton } from './components/dankbook';
import { IMXBalanceButton } from './imxBalanceButton';
import { DiscordButton } from './discordButton';
import { DankMarketButton } from './components/dankmarket-button';

export const ButtonBar = ({handleOpenModal, userProfile, account}) => {
    const [balance, setBalance] = useState();

    const fetchBalance = useCallback(async () => {
        const client = await ImmutableXClient.build({ publicApiUrl: process.env.NEXT_PUBLIC_API_URL });
        const balances = await client.listBalances({user: account});
        console.log(balances);
        balances.result.forEach((el) => {
            if (el.symbol === "ETH") {
                setBalance({...el});            
            }
        });   
    }, [account]);

    useEffect(() => {
        if (account && fetchBalance) {
            fetchBalance();
            // setInterval(() => {
            //     fetchBalance()
            // }, 5000);
        }
    }, [account, fetchBalance]);

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
                            <DiscordButton />
                            <DankBookButton />
                            <DankMarketButton />
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
                                <IMXBalanceButton imxBalance={balance} account={account} fetchBalance={fetchBalance} />
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