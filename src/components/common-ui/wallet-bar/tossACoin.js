import React, { useState } from 'react'
import { Button, Box, Text, Tooltip } from "@chakra-ui/react";
import { AppColors } from "styles/styles";
import { useDisclosure } from "@chakra-ui/react";
import { TossACoinModal } from "src/components/common-ui/wallet-bar/tossACoinModal";

export const TossACoin = ({userAddress, treeFiddyBalance}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box>
            <Tooltip 
                bg={AppColors.buttonBackground}
                borderRadius="xl"
                border="1px"
                borderColor="gray.700"
                label="Tip the developer with TreeFiddyCoins">
                <Button
                    onClick={onOpen}
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
                    px={3}
                    height="38px">
                    <Text color="white" fontSize="md">
                        🎶  Here Comes The Money 🎶 
                    </Text>                                  
                </Button>                
            </Tooltip>
            <TossACoinModal isOpen={isOpen} onClose={onClose} treeFiddyBalance={treeFiddyBalance} />
        </Box>
    )
}
