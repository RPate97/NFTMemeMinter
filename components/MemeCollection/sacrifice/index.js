import React, { useState, useEffect } from 'react'
import { AppColors } from "styles/styles";
import { formatUnits } from '@ethersproject/units'
import { ethers } from "ethers";
import Image from "next/image";
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
    Tooltip,
    useDisclosure,
  } from "@chakra-ui/react";

export const SacrificeButton = ({treeFiddyBalance, memeId}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const CONTRACT_INTERFACE = new ethers.utils.Interface(abi);
    const MEME_ADDRESS = '0xcfeb869f69431e42cdb54a4f4f105c19c080a601';
    const contract = new ethers.Contract(MEME_ADDRESS, CONTRACT_INTERFACE);
    const [ amount, setAmount ] = useState(3.5);
    const { state, send } = useContractFunction(contract, 'sacrificeToMeme', { transactionName: 'TipDev' })

    const sacrifice = () => {
        const weiAmt = web3.utils.toWei(amount.toString(), "ether");
        send(memeId, weiAmt);
    }

    return (
        <Box>
            <Tooltip 
                bg={AppColors.buttonBackground}
                borderRadius="xl"
                border="1px"
                borderColor="gray.700"
                label="Burn your TreeFiddies to increase this memes dankness.">
                <Button
                    onClick={onOpen}
                    bg={AppColors.buttonBackground}
                    border="1px solid transparent"
                    _hover={{
                        border: "1px",
                        borderStyle: "solid",
                        borderColor: "white",
                        backgroundColor: "gray.700",
                    }}
                    borderRadius="xl"
                    m="0px"
                    height="38px">
                    <Text color="white" fontSize="md" fontWeight="medium">
                        Make a Sacrifice
                    </Text>
                </Button>
            </Tooltip>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
                <ModalOverlay />
                <ModalContent
                    background={AppColors.buttonBackground}
                    border="1px"
                    borderStyle="solid"
                    borderColor="gray.700"
                    borderRadius="3xl">
                    <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
                        Make A Sacrifice Before This Meme
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
                            <Text fontWeight="bold" fontSize="lg" color="white" mt={2} pl={5}>
                                When you spend all your TreeFiddies leveling up your memes:
                            </Text>
                            <Flex flexDirection="column" justifyContent="space-between" alignItems="center" mb={3} pl={5} pr={5}>
                                <Image src="/salvation.jpeg" width="800" height="450" alt="salvation"/>
                                {treeFiddyBalance && <Slider mt={5} defaultValue={amount} min={3.5} max={formatUnits(treeFiddyBalance, 18)} step={3.5} onChange={(value) => setAmount(value)}>
                                    <SliderTrack bg="red.100">
                                        <Box position="relative" right={10} />
                                        <SliderFilledTrack bg="tomato" />
                                    </SliderTrack>
                                    <SliderThumb boxSize={6} />
                                </Slider>}
                                <Button
                                    onClick={sacrifice}
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
                                        Sacrifice {amount} TreeFiddies
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
                </ModalContent>
            </Modal>
        </Box>
    );
}