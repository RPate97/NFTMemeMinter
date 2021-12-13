import React, { useEffect } from 'react'
import { Button, Box, Text, Tooltip } from "@chakra-ui/react";
import { AppColors } from "styles/styles";
import { formatUnits } from '@ethersproject/units'

export const IMXBalanceButton = ({imxBalance}) => {
    return (
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
                    height="38px">
                    <Text color="white" fontSize="md">
                        {imxBalance} ETH
                    </Text>                                
                </Button>                
            </Tooltip>
        </Box>
    )
}