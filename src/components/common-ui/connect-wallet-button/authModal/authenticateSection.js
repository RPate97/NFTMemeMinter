import React from 'react'
import {
    Box,
    Button,
    Flex,
    ModalBody,
    Text,
  } from "@chakra-ui/react";

export const AuthenticateSection = ({authenticate, nonce}) => {
    return (
        <ModalBody pt={0} px={0}>
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
                <Box
                    borderRadius="3xl"
                    border="1px"
                    borderStyle="solid"
                    borderColor="gray.600"
                    m={0}
                    p={0}
                    px={5}
                    pt={0}
                    pb={2}
                    mb={3}
                >
                    <Flex flexDirection="column" justifyContent="space-between" alignItems="center" mb={3} pl={5} pr={5}>
                        <Text color="white" fontSize="20" overflowWrap="anywhere" textAlign="center" mt={3}>
                            Please sign this message to verify your identity
                        </Text>
                        <Text color="white" fontSize="14" overflowWrap="anywhere" textAlign="center" mt={3}>
                            {nonce} 
                        </Text>
                        <Text color="white" fontSize="14" textAlign="center" mt={3}>
                            You will need a browser based wallet to complete the sign in process. If you do not have one, we recommend installing the Metamask browser extension: https://metamask.io/
                        </Text>
                    </Flex>
                </Box>
                <Button
                    onClick={authenticate}
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
                        Sign
                    </Text>   
                </Button> 
            </Flex> 
        </ModalBody>
    );
}