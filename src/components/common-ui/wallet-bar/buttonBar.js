
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button, Box, Text, useDisclosure } from "@chakra-ui/react";
import { Identicon } from "src/components/common-ui/wallet-bar/identicon";
import { CollectionButton } from "src/components/common-ui/wallet-bar/collectionButton";
import { Flex, Tooltip } from "@chakra-ui/react";
import { AppColors } from "styles/styles";
import { TossACoin } from "src/components/common-ui/wallet-bar/tossACoin";
import { MintButton } from "src/components/common-ui/wallet-bar/mintButton";
import { PlayerDankness } from "src/components/common-ui/wallet-bar/danknessTier"; 
import { ImmutableMethodResults, ImmutableXClient } from '@imtbl/imx-sdk';
import { ERC721TokenType, ETHTokenType, EthAddressBrand } from '@imtbl/imx-sdk';
import { DankBookButton } from './components/dankbook';
import { IMXBalanceButton } from './imxBalanceButton';
import { DiscordButton } from './discordButton';
import { BuyCryptoButton } from './buy-crypto';
import { AccountModal } from "src/components/common-ui/wallet-bar/accountModal.js";

export const ButtonBar = ({userProfile, account, deactivate}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ethBalance, setEthBalance] = useState();
    const [usdcBalance, setUSDCBalance] = useState();

    const fetchBalance = useCallback(async () => {
        const client = await ImmutableXClient.build({ publicApiUrl: process.env.NEXT_PUBLIC_API_URL });
        const balances = await client.listBalances({user: account}, ['ETH', 'USDC']);
        balances.result.forEach((el) => {
            if (el.symbol === "ETH") {
                setEthBalance({...el});            
            } else if (el.symbol === "USDC") {
                setUSDCBalance({...el});            
            }
        });   
    }, [account]);

    useEffect(() => {
        if (account && fetchBalance) {
            fetchBalance();
        }
    }, [account, fetchBalance]);

    return (
        <>
            {/* <PlayerDankness account={account} /> */}
            {account && <Box display="flex"
                alignItems="start"
                marginRight="4">
                <Flex direction="column" justify="end">
                    <Flex direction="row">
                        <DiscordButton />
                        {/* <DankBookButton /> */}
                        {/* <CollectionButton userAddress={account}/>
                        <MintButton />   */}
                        <BuyCryptoButton />
                        <Box
                            ml="1.5"
                            display="flex"
                            alignItems="center"
                            border="1px"
                            borderColor="gray.700"
                            borderRadius="xl"
                            py="0">
                            <IMXBalanceButton ethBalance={ethBalance} usdcBalance={usdcBalance} account={account} fetchBalance={fetchBalance} />
                            <Tooltip 
                                bg={AppColors.buttonBackground}
                                borderRadius="xl"
                                border="1px"
                                borderColor="gray.700"
                                label="You are here 🎯">
                                <Button
                                    bg={AppColors.buttonBackground}
                                    border="1px solid transparent"
                                    _hover={{
                                        border: "1px",
                                        borderStyle: "solid",
                                        borderColor: "white",
                                        backgroundColor: "gray.700",
                                    }}
                                    onClick={onOpen}
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
                            </Tooltip>
                        </Box>                         
                    </Flex>
                </Flex>                
            </Box>}
            <AccountModal isOpen={isOpen} onClose={onClose} account={account} deactivate={deactivate} />
        </>
    )
}