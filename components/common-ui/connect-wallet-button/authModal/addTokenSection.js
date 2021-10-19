import React from 'react'
import {
    Box,
    Button,
    Flex,
    ModalBody,
    Text,
  } from "@chakra-ui/react";

export const AddTokenSection = ({addTokens}) => {
    return (
        <ModalBody pt={0} px={4}>
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
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
                        <Text color="white" fontSize="20" overflowWrap="anywhere" textAlign="center" mt={3}>
                            DankMinter has two custom tokens, please add them to your MetaMask wallet.
                        </Text>
                        <Text color="white" fontSize="14" overflowWrap="anywhere" textAlign="center" mt={3}>
                            If you are not using MetaMask you can add them to your wallet manually using the following information: 
                        </Text>
                    </Flex>
                </Box>
                <Button
                    onClick={addTokens}
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
                    height="38px"
                    p={0}
                    pb="1px">
                    <Text color="white" fontSize="md" p={4} m={0}>
                        Add Tokens
                    </Text>   
                </Button> 
            </Flex> 
        </ModalBody>
    );
}