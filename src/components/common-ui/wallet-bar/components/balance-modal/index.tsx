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
    useToast,
    Spinner
  } from "@chakra-ui/react";
import { AppColors } from "styles/styles";
import { Link, ETHTokenType, ExchangeCurrency } from '@imtbl/imx-sdk';
import { ImmutableMethodResults, ImmutableXClient } from '@imtbl/imx-sdk';
import { useEffect, useMemo, useState } from "react";
import { ethers } from 'ethers';

type Props = {
    isOpen: boolean,
    onClose: () => void,
    ethBalance: any,
    usdcBalance: any,
    account: string,
    fetchBalance: () => Promise<void>,
};

export const BalanceModal: React.FC<Props> = ({isOpen, onClose, ethBalance, usdcBalance, account, fetchBalance}) => {  
    const toast = useToast();
    const [depositMutating, setDepositMutating] = useState<boolean>(false);
    const [withdrawalMutating, setWithdrawalMutating] = useState<boolean>(false);
    const [completeWithdrawalMutating, setCompleteWithdrawalMutating] = useState<boolean>(false);
    const [buyCryptoMutating, setBuyCryptoMutating] = useState<boolean>(false);


    let imx_balance_eth = ethBalance ? ethers.utils.formatEther(ethBalance.balance._hex) : 0;
    let preparing_withdrawal_eth = ethBalance ? ethers.utils.formatEther(ethBalance.preparing_withdrawal._hex) : 0;
    let withdrawable_eth = ethBalance ? ethers.utils.formatEther(ethBalance.withdrawable._hex) : 0;

    let imx_balance_usdc = usdcBalance ? ethers.utils.formatUnits(usdcBalance.balance._hex, 6) : 0;
    let preparing_withdrawal_usdc = usdcBalance ? ethers.utils.formatUnits(usdcBalance.preparing_withdrawal._hex, 6) : 0;
    let withdrawable_usdc = usdcBalance ? ethers.utils.formatUnits(usdcBalance.withdrawable._hex, 6) : 0;


    const link = useMemo(() => {
        return new Link(process.env.NEXT_PUBLIC_LINK_ADDRESS);
    }, []);

    const handleDeposit = async () => {
        try {
            setDepositMutating(true);
            await link.deposit();
            toast({
                position: 'bottom-left',
                render: () => (
                  <Box color='white' p={3} bg='green.500' borderRadius="md" boxShadow="md">
                    Deposit initiated! Note: it may take up to 24 hours for your deposite to show up in IMX.
                  </Box>
                ),
            });
            setDepositMutating(false);
        } catch (e) {
            toast({
                position: 'bottom-left',
                render: () => (
                <Box color='white' p={3} bg='blue.500' borderRadius="md" boxShadow="md">
                    Cancelled Deposit
                </Box>
                ),
            });
            setDepositMutating(false);
        }
        setTimeout(async () => {
            await fetchBalance();
        }, 1000);
    }

    const handleWithdraw = async () => {
        try {
            setWithdrawalMutating(true);
            await link.prepareWithdrawal({
                type: ETHTokenType.ETH,
                amount: '3.375', //The amount of the token to withdraw
            });
            toast({
                position: 'bottom-left',
                render: () => (
                  <Box color='white' p={3} bg='green.500' borderRadius="md" boxShadow="md">
                    {"Withdrawal preparation initiated! When your withdrawal is fully prepared, you'll need to come back and finalize it. Note: It my take up to an hour for your withdrawal to be prepared."}
                  </Box>
                ),
            });
            setWithdrawalMutating(false);
        } catch (e) {
            toast({
                position: 'bottom-left',
                render: () => (
                <Box color='white' p={3} bg='blue.500' borderRadius="md" boxShadow="md">
                    Cancelled Withdrawal Initiation
                </Box>
                ),
            });
            setWithdrawalMutating(false);
        }
        setTimeout(async () => {
            await fetchBalance();
        }, 1000);
    }

    const handleCompleteWithdraw = async () => {
        try {
            setCompleteWithdrawalMutating(true);
            await link.completeWithdrawal({
                type: ETHTokenType.ETH
            });
            toast({
                position: 'bottom-left',
                render: () => (
                  <Box color='white' p={3} bg='green.500' borderRadius="md" boxShadow="md">
                    {"Withdrawal completed! Note: It may take up to 48 hours for your withdrawal to reach your mainnet wallet."}
                  </Box>
                ),
            });
            setCompleteWithdrawalMutating(false);
        } catch (e) {
            toast({
                position: 'bottom-left',
                render: () => (
                <Box color='white' p={3} bg='blue.500' borderRadius="md" boxShadow="md">
                    Cancelled Withdrawal Confirmation
                </Box>
                ),
            });
            setCompleteWithdrawalMutating(false)
        }
        setTimeout(async () => {
            await fetchBalance();
        }, 1000);
    }

    const handleBuyCrypto = async () => {
        try {
            setBuyCryptoMutating(true);
            await link.fiatToCrypto({cryptoCurrencies: [ExchangeCurrency.ETH, ExchangeCurrency.USDC]});  
            toast({
                position: 'bottom-left',
                render: () => (
                  <Box color='white' p={3} bg='green.500' borderRadius="md" boxShadow="md">
                    Purchase completed!
                  </Box>
                ),
            });
            setBuyCryptoMutating(false);          
        } catch (e) {
            toast({
                position: 'bottom-left',
                render: () => (
                  <Box color='white' p={3} bg='blue.500' borderRadius="md" boxShadow="md">
                    Cancelled Crypto Purchase
                  </Box>
                ),
            });
            setBuyCryptoMutating(false);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent
                background={AppColors.buttonBackground}
                border="1px"
                borderStyle="solid"
                borderColor="gray.700"
                borderRadius="3xl">
                <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
                    Balances
                    <Text
                        color="white"
                        textAlign="left"
                        fontWeight="medium"
                        fontSize="sm">
                        {"DankMinter uses the ImmutableX platform for gasless minting and trading. To buy NFTs, you'll need to get some crypto into IMX."}
                    </Text>
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
                                fontSize="lg"
                                mb={1}>
                                Need crypto?
                            </Text>
                            <Flex flexDirection="row" width="100%">
                                <Flex flexDirection="row" alignItems="center">
                                    {buyCryptoMutating && <Spinner color="white" mr={2} />}
                                    <Button
                                        disabled={buyCryptoMutating}
                                        isFullWidth={true}
                                        bg="transparent"
                                        border="1px solid white"
                                        _hover={{
                                            border: "1px",
                                            borderStyle: "solid",
                                            borderColor: "white",
                                            backgroundColor: "gray.700",
                                        }}
                                        borderColor={!buyCryptoMutating ? "white" : "gray.400"}
                                        borderRadius="xl"
                                        m="0px"
                                        mr="5px"
                                        height="38px"
                                        onClick={handleBuyCrypto}>
                                        <Text color={!buyCryptoMutating ? "white" : "gray.400"} fontSize="md">
                                            Buy with USD
                                        </Text>                                
                                    </Button> 
                                </Flex> 
                            </Flex>
                            <Text
                                color="white"
                                textAlign="left"
                                fontWeight="medium"
                                fontSize="lg"
                                mt={3}>
                                Already got some crypto?
                            </Text>
                            <Text
                                color="white"
                                textAlign="left"
                                fontWeight="medium"
                                fontSize="md">
                                Deposited ETH: {imx_balance_eth} | USDC: {imx_balance_usdc}
                            </Text>
                            <Text
                                color="white"
                                textAlign="left"
                                fontWeight="medium"
                                fontSize="md">
                                Withdrawable ETH: {withdrawable_eth} | USDC: {withdrawable_usdc}
                            </Text>
                            <Text
                                color="white"
                                textAlign="left"
                                fontWeight="medium"
                                fontSize="md">
                                Preparing {preparing_withdrawal_eth} ETH and {preparing_withdrawal_usdc} USDC for withdrawal
                            </Text>
                        </Flex>   
                        <Flex flexDirection="row" justifyContent="start" mt={2}>
                            <Flex flexDirection="row" alignItems="center">
                                {depositMutating && <Spinner color="white" mr={2} />}
                                <Button
                                    disabled={depositMutating}
                                    bg="transparent"
                                    border="1px solid white"
                                    _hover={{
                                        border: "1px",
                                        borderStyle: "solid",
                                        borderColor: "white",
                                        backgroundColor: "gray.700",
                                    }}
                                    borderColor={!depositMutating ? "white" : "gray.400"}
                                    borderRadius="xl"
                                    m="0px"
                                    mr="10px"
                                    height="38px"
                                    onClick={handleDeposit}>
                                    <Text color={!depositMutating ? "white" : "gray.400"} fontSize="md">
                                        Deposit
                                    </Text>                                
                                </Button>
                            </Flex>
                            <Flex flexDirection="row" alignItems="center">
                                {withdrawalMutating && <Spinner color="white" mr={2} />}
                                <Button
                                    disabled={withdrawalMutating}
                                    bg="transparent"
                                    border="1px solid white"
                                    _hover={{
                                        border: "1px",
                                        borderStyle: "solid",
                                        borderColor: "white",
                                        backgroundColor: "gray.700",
                                    }}
                                    borderColor={!withdrawalMutating ? "white" : "gray.400"}
                                    borderRadius="xl"
                                    m="0px"
                                    mr="10px"
                                    height="38px"
                                    onClick={handleWithdraw}>
                                    <Text color={!withdrawalMutating ? "white" : "gray.400"} fontSize="md">
                                        Start Withdrawal
                                    </Text>                                
                                </Button> 
                            </Flex>
                            <Flex flexDirection="row" alignItems="center">
                                {completeWithdrawalMutating && <Spinner color="white" mr={2} />}
                                <Button
                                    disabled={completeWithdrawalMutating}
                                    bg="transparent"
                                    border="1px solid white"
                                    _hover={{
                                        border: "1px",
                                        borderStyle: "solid",
                                        borderColor: "white",
                                        backgroundColor: "gray.700",
                                    }}
                                    borderColor={!completeWithdrawalMutating ? "white" : "gray.400"}
                                    borderRadius="xl"
                                    m="0px"
                                    mr="0px"
                                    height="38px"
                                    onClick={handleCompleteWithdraw}>
                                    <Text color={!completeWithdrawalMutating ? "white" : "gray.400"} fontSize="md">
                                        Complete Withdraw
                                    </Text>                                
                                </Button>  
                            </Flex>
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
                        Deposits and withdrawals must be confirmed with the Ethereum mainnet and may take up to 48 hours to be completed.  
                    </Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );

}