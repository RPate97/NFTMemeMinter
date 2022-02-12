import React, { useEffect, useState } from 'react'
import { Button, Box, Text, Tooltip } from "@chakra-ui/react";
import { AppColors } from "styles/styles";
import { formatUnits } from '@ethersproject/units';
import { BalanceModal } from "components/common-ui/wallet-bar/components/balance-modal";
import { useDisclosure, Loader } from "@chakra-ui/react";
import { ethers } from 'ethers';

const BigNumber = require('bignumber.js');

export const IMXBalanceButton = ({imxBalance, account, fetchBalance}) => {
    const [amountInEth, setAmountInEth] = useState(null);

    useEffect(() => {
        if (imxBalance) {
            setAmountInEth(ethers.utils.formatEther(imxBalance.balance._hex));
        } else {
            setAmountInEth(0);
        }
    }, [imxBalance]);

    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <>
            <Box>
                <Tooltip 
                    bg={AppColors.buttonBackground}
                    borderRadius="xl"
                    border="1px"
                    borderColor="gray.700"
                    label="Your ImmutableX layer 2 ETH balance. If you have ETH in mainnet, you must transfer it to layer 2 before you can use it in DankMinter.">
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
                    </Button>                
                </Tooltip>
            </Box>
            <BalanceModal isOpen={isOpen} onClose={onClose} balance={imxBalance} account={account} fetchBalance={fetchBalance} />
        </>
    )
}