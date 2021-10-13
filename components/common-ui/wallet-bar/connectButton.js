
import React, { useEffect, useState } from 'react';
import { useEthers } from "@usedapp/core";
import { Button, Box, Text, Tooltip } from "@chakra-ui/react";
import { Identicon } from "components/common-ui/wallet-bar/identicon";
import { CollectionButton } from "components/common-ui/wallet-bar/collectionButton";
import { Flex, Spacer } from "@chakra-ui/react";
import { Logo } from "components/common-ui/logo";
import { AppColors } from "styles/styles";
import { TossACoin } from "components/common-ui/wallet-bar/tossACoin";
import { TreeFiddyButton } from 'components/common-ui/wallet-bar/TreeFiddyButton';
import { useTokenBalance } from '@usedapp/core'

export const ConnectButton = ({handleOpenModal}) => {
    const {activateBrowserWallet, account } = useEthers();
    const TREE_FIDDY_ADDRESS = '0xc89ce4735882c9f0f0fe26686c53074e09b0d550'
    let treeFiddyBalance = useTokenBalance(TREE_FIDDY_ADDRESS, account);

    function handleConnectWallet() {
        activateBrowserWallet();
    }

    return (
        <div style={{position: "sticky", top: 0}}>
            <Flex
                flexDirection="row"
                alignItems="end"
                justifyContent="center"
                h="20">
                <Logo />
                <Spacer />
                <Box display="flex"
                    height="20"
                    alignItems="center"
                    marginRight="5">
                {account ? (
                    <Flex direction="row">
                        <TossACoin treeFiddyBalance={treeFiddyBalance}/>
                        <Box
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
                                <Identicon />
                            </Button>
                        </Box>                         
                    </Flex>
                ) : (
                    <Button onClick={handleConnectWallet}>Connect to a wallet</Button>
                )}                  
                </Box>
        
            </Flex>            
        </div>
    )
}