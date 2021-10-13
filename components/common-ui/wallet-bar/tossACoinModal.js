import React, { useState, useEffect } from 'react'
import { AppColors } from "styles/styles";
import { formatUnits } from '@ethersproject/units'
import { ethers } from "ethers";
import abi from 'contracts/dankminter-abi.json';
import Web3 from 'web3';
import { useContractFunction } from '@usedapp/core'
import {
    Box,
    Button,
    Flex,
    Link,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Spacer,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
  } from "@chakra-ui/react";

export const TossACoinModal = ({userAddress, isOpen, onClose, treeFiddyBalance}) => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const CONTRACT_INTERFACE = new ethers.utils.Interface(abi);
    const MEME_ADDRESS = '0xcfeb869f69431e42cdb54a4f4f105c19c080a601'
    const contract = new ethers.Contract(MEME_ADDRESS, CONTRACT_INTERFACE, userAddress);
    const [ amount, setAmount ] = useState(3.5);
    const { state, send } = useContractFunction(contract, 'tossACoin', { transactionName: 'TipDev' })

    const tossACoin = () => {
        console.log(amount);
        const weiAmt = web3.utils.toWei(amount.toString(), "ether");
        send(weiAmt);
    }

    useEffect(() => {
        console.log(state);
    }, [state])

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
            <ModalOverlay />
            <ModalContent
                background={AppColors.buttonBackground}
                border="1px"
                borderStyle="solid"
                borderColor="gray.700"
                borderRadius="3xl">
                <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
                    🎶  Here Comes The Money 🎶  - Tip The Developer
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
                        pb={2}
                        mb={3}
                    >
                        <Flex flexDirection="column" justifyContent="space-between" alignItems="center" mb={3} pl={5} pr={5}>
                        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/-T7EAFzjYSY?controls=0?&autoplay=1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                            {treeFiddyBalance && <Slider mt={5} defaultValue={amount} min={3.5} max={formatUnits(treeFiddyBalance, 18)} step={3.5} onChange={(value) => setAmount(value)}>
                                <SliderTrack bg="red.100">
                                    <Box position="relative" right={10} />
                                    <SliderFilledTrack bg="tomato" />
                                </SliderTrack>
                                <SliderThumb boxSize={6} />
                            </Slider>}
                            <Button
                                onClick={tossACoin}
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
                                mt="5px"
                                px={3}
                                height="38px">
                                {treeFiddyBalance && <Text color="white" fontSize="md">
                                    Tip {amount} TreeFiddies
                                </Text>}                                 
                            </Button> 
                            <Text color="white" fontSize="md" mt={2}>
                                *MATIC gas not included
                            </Text>
                            <Text color="white" fontSize="md" mt={2}>
                                Not sure how to get gas? Checkout this guide: {/* TODO - add guide link */}
                            </Text>
                        </Flex>
                    </Box>
                </ModalBody>
                <ModalFooter
                justifyContent="end"
                background="gray.900"
                borderBottomLeftRadius="3xl"
                borderBottomRightRadius="3xl"
                p={6} m  >
                    <Flex flexDirection="column">
                        <Text
                            color="white"
                            textAlign="left"
                            fontWeight="medium"
                            fontSize="md">
                            Want to tip something else? 
                        </Text> 
                        <Text
                            color="white"
                            textAlign="left"
                            fontWeight="medium"
                            fontSize="md">
                            ETH: 0xC6f9519F8e2C2be0bB29A585A894912Ccea62Dc8
                        </Text>
                        <Text
                            color="white"
                            textAlign="left"
                            fontWeight="medium"
                            fontSize="md">
                            BTC: 38R1bDUJqTYK9W8r6PRzwjozXbJZhcx27Y
                        </Text>
                        <Spacer />
                        <Text
                            color="white"
                            textAlign="left"
                            fontWeight="medium"
                            fontSize="md">
                            Tips will be going straight to paying gas fees for users. 
                        </Text>                        
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}