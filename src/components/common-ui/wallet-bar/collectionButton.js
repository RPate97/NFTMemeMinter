import React from 'react'
import Link from 'next/link';
import { Button, Box, Text, Tooltip } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useContractCall } from "@usedapp/core";
import abi from 'contracts/dankminter-abi.json';
import { AppColors } from "styles/styles";

export const CollectionButton = ({userAddress}) => {
    return (
        <Box px="0">
            <Tooltip
                bg={AppColors.buttonBackground}
                borderRadius="xl"
                border="1px"
                borderColor="gray.700"
                label="This will make a fine addition to my collection">
                    <Button
                        bg="transparent"
                        border="1px solid transparent"
                        _hover={{
                            border: "1px",
                            borderStyle: "solid",
                            borderColor: "white",
                            backgroundColor: "gray.700",
                        }}
                        borderColor="gray.700"
                        borderRadius="xl"
                        m="0px"
                        mr="5px"
                        px={0}
                        height="40px">
                        <Link href='/' passHref>
                            <Text color="white" fontSize="md" py={5} px={3} m={0}>
                                Collection
                            </Text>                                      
                        </Link>
                    </Button>  
            </Tooltip>
        </Box>
    )
}
