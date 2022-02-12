// AccountModal.tsx
import {
    Box,
    Button,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
  } from "@chakra-ui/react";
import { AppColors } from "styles/styles";
import { Link, ETHTokenType } from '@imtbl/imx-sdk';
import { ImmutableMethodResults, ImmutableXClient } from '@imtbl/imx-sdk';
import { useEffect, useMemo, useState } from "react";
import { ethers } from 'ethers';

type Props = {
    isOpen: boolean,
    onClose: () => void,
    balance: any,
    account: string,
    fetchBalance: () => Promise<void>,
};

export const BalanceModal: React.FC<Props> = ({isOpen, onClose, balance, account, fetchBalance}) => {  
    let imx_balance = balance ? ethers.utils.formatEther(balance.balance._hex) : 0;
    let preparing_withdrawal = balance ? ethers.utils.formatEther(balance.preparing_withdrawal._hex) : 0;
    let withdrawable = balance ? ethers.utils.formatEther(balance.withdrawable._hex) : 0;

    const link = useMemo(() => {
        return new Link(process.env.NEXT_PUBLIC_LINK_ADDRESS);
    }, []);

    const handleDeposit = async () => {
        await link.deposit();
        setTimeout(async () => {
            await fetchBalance();
        }, 1000);
    }

    const handleWithdraw = async () => {
        await link.prepareWithdrawal({
            type: ETHTokenType.ETH,
            amount: '1.13', //The amount of the token to withdraw
        });
        setTimeout(async () => {
            await fetchBalance();
        }, 1000);
    }

    const handleCompleteWithdraw = async () => {
        await link.completeWithdrawal({
            type: ETHTokenType.ETH
        });
        setTimeout(async () => {
            await fetchBalance();
        }, 1000);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
            <ModalOverlay />
            <ModalContent
                background={AppColors.buttonBackground}
                border="1px"
                borderStyle="solid"
                borderColor="gray.700"
                borderRadius="3xl">
                <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
                    Balances
                </ModalHeader>
                <ModalCloseButton
                color="white"
                fontSize="sm"
                _hover={{
                    color: "whiteAlpha.700",
                }}
                />
                <ModalBody pt={0} px={4}>
                    <Box
                        borderRadius="3xl"
                        border="1px"
                        borderStyle="solid"
                        borderColor="gray.600"
                        px={5}
                        pt={4}
                        pb={4}
                        mb={3}
                    >  
                        <Flex flexDirection="column" justifyContent="space-between" alignItems="start">
                            <Text
                                color="white"
                                textAlign="left"
                                fontWeight="medium"
                                fontSize="md">
                                Deposited ETH: {imx_balance}
                            </Text>
                            <Text
                                mt={2}
                                color="white"
                                textAlign="left"
                                fontWeight="medium"
                                fontSize="md">
                                Withdrawable ETH: {withdrawable}
                            </Text>
                            <Text
                                mt={2}
                                color="white"
                                textAlign="left"
                                fontWeight="medium"
                                fontSize="md">
                                Preparing {preparing_withdrawal} ETH for withdrawal
                            </Text>
                        </Flex>   
                        <Flex flexDirection="row" justifyContent="space-between" mt={2}>
                            <Button
                                bg="transparent"
                                border="1px solid white"
                                _hover={{
                                    border: "1px",
                                    borderStyle: "solid",
                                    borderColor: "white",
                                    backgroundColor: "gray.700",
                                }}
                                borderRadius="xl"
                                m="0px"
                                mr="0px"
                                height="38px"
                                onClick={handleDeposit}>
                                <Text color="white" fontSize="md">
                                    Deposit
                                </Text>                                
                            </Button>
                            <Button
                                bg="transparent"
                                border="1px solid white"
                                _hover={{
                                    border: "1px",
                                    borderStyle: "solid",
                                    borderColor: "white",
                                    backgroundColor: "gray.700",
                                }}
                                borderRadius="xl"
                                m="0px"
                                mr="0px"
                                height="38px"
                                onClick={handleWithdraw}>
                                <Text color="white" fontSize="md">
                                    Start Withdraw
                                </Text>                                
                            </Button> 
                            <Button
                                bg="transparent"
                                border="1px solid white"
                                _hover={{
                                    border: "1px",
                                    borderStyle: "solid",
                                    borderColor: "white",
                                    backgroundColor: "gray.700",
                                }}
                                borderRadius="xl"
                                m="0px"
                                mr="0px"
                                height="38px"
                                onClick={handleCompleteWithdraw}>
                                <Text color="white" fontSize="md">
                                    Complete Withdraw
                                </Text>                                
                            </Button>  
                        </Flex>
                    </Box>
                </ModalBody>

                <ModalFooter
                    justifyContent="end"
                    background="gray.900"
                    borderBottomLeftRadius="3xl"
                    borderBottomRightRadius="3xl"
                    p={6}>
                    <Text
                        color="white"
                        textAlign="left"
                        fontWeight="medium"
                        fontSize="md">
                    </Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );

}