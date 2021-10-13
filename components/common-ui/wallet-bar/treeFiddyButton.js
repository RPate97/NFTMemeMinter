import React, { useEffect } from 'react'
import { Button, Box, Text, Tooltip } from "@chakra-ui/react";
import { AppColors } from "styles/styles";
import { formatUnits } from '@ethersproject/units'

export const TreeFiddyButton = ({treeFiddyBalance}) => {
    return (
        <Box>
            <Tooltip 
                bg={AppColors.buttonBackground}
                borderRadius="xl"
                border="1px"
                borderColor="gray.700"
                label="TF stands for TreeFiddies which are the DankMinter ERC20 token. TreeFiddies are required to perform various actions on DankMinter memes such as tipping, sacrificing, and voting. You can earn it by minting dank memes, or click to buy it on Quickswap.">
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
                    {treeFiddyBalance && <Text color="white" fontSize="md">
                        {formatUnits(treeFiddyBalance, 18)} TF 
                    </Text>}                                 
                </Button>                
            </Tooltip>
        </Box>
    )
}