import React, { useEffect, useState } from 'react'
import { Button, Box, Text, Tooltip, Divider } from "@chakra-ui/react";
import { AppColors } from "styles/styles";
import { BalanceModal } from "components/common-ui/wallet-bar/components/balance-modal";
import { useDisclosure } from "@chakra-ui/react";
import { ethers } from 'ethers';

const BigNumber = require('bignumber.js');

export const IMXBalanceButton = ({ethBalance, usdcBalance, account, fetchBalance}) => {
    const [amountInEth, setAmountInEth] = useState(null);
    const [amountInUSDC, setAmountInUSDC] = useState(null);
    const { isOpen, onClose, onOpen } = useDisclosure();

    useEffect(() => {
        if (ethBalance) {
            setAmountInEth(ethers.utils.formatEther(ethBalance.balance._hex));
        } else {
            setAmountInEth(0);
        }
        if (usdcBalance) {
            setAmountInUSDC(ethers.utils.formatUnits(usdcBalance.balance._hex, 6));
        } else {
            setAmountInUSDC(0);
        }
    }, [ethBalance, usdcBalance]);

    return (
        <>
            <Box>
                <Tooltip 
                    bg={AppColors.buttonBackground}
                    borderRadius="xl"
                    border="1px"
                    borderColor="gray.700"
                    label="Dolla dolla bills, ya'll">
                    <Button
                        bg="transparent"
                        border="1px solid transparent"
                        _hover={{
                            border: "1px",
                            borderStyle: "solid",
                            borderColor: "white",
                            backgroundColor: "gray.700",
                        }}
                        borderRadius="xl"
                        m="0px"
                        mr="5px"
                        px={3}
                        height="38px"
                        onClick={onOpen}>
                        <Text color="white" fontSize="md">
                            {amountInEth} ETH
                        </Text> 
                        <Divider orientation='vertical' borderColor="white" mx={2} /> 
                        <Text color="white" fontSize="md">
                            {amountInUSDC} USDC
                        </Text>                           
                    </Button>                
                </Tooltip>
            </Box>
            <BalanceModal isOpen={isOpen} onClose={onClose} ethBalance={ethBalance} usdcBalance={usdcBalance} account={account} fetchBalance={fetchBalance} />
        </>
    )
}