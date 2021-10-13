import React from 'react'
import Link from 'next/link';
import { Button, Box, Text, Tooltip } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useContractCall } from "@usedapp/core";
import abi from 'contracts/dankminter-abi.json';
import { AppColors } from "styles/styles";

export const CollectionButton = ({userAddress}) => {
    const CONTRACT_INTERFACE = new ethers.utils.Interface(abi);
    const MEME_ADDRESS = '0xcfeb869f69431e42cdb54a4f4f105c19c080a601'
    function useMemeBalance() {
        try {
            const memeBalance = useContractCall(userAddress && {
                abi: CONTRACT_INTERFACE, 
                address: MEME_ADDRESS, 
                method: "getNumStashedMemes", 
                args: [userAddress]
            });
            return `${memeBalance}`;            
        } catch (e) {
            console.error(e);
        }
    }
    const memeBalance = useMemeBalance();

    return (
        <Box px="0">
            <Tooltip
                bg={AppColors.buttonBackground}
                borderRadius="xl"
                border="1px"
                borderColor="gray.700"
                label="Click to visit your DankMinter collection.">
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
                        px={0}
                        height="38px">
                        <Link href='/collection' passHref>
                            <Text color="white" fontSize="md" p={5} m={0}>
                            {memeBalance} {memeBalance === '1' ? 'MEME' : 'MEMES'} 
                            </Text>                                      
                        </Link>
                    </Button>  
            </Tooltip>
        </Box>
    )
}
