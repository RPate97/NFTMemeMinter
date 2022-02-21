import React from 'react'
import { styles } from 'styles/styles'
import { Flex, Text } from "@chakra-ui/react";

export const Logo = () => {
    return (
        <Flex
            flexDirection="column"
            alignItems="start"
            justifyContent="center"
            marginLeft="3">
            <Text color="white" fontFamily="Pink Blue" fontSize="5xl">Dank Economy</Text> 
            {/* <Text color="white" fontFamily="pacificoregular" fontSize="large" ml={2}>By Dank Labs</Text>          */}
        </Flex>
    )
}