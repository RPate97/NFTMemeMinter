import React from 'react'
import { styles } from 'styles/styles'
import { Flex, Text } from "@chakra-ui/react";

export const Logo = () => {
    return (
        <Flex
            flexDirection="column"
            alignItems="start"
            justifyContent="center"
            h="28"
            marginLeft="3">
            <Text color="white" fontFamily="Pink Blue" fontSize="5xl" lineHeight="10" mt={2}>Dank Economy</Text> 
            <Text color="white" fontFamily="pacificoregular" fontSize="large" ml={2}>By Dank Labs</Text>         
        </Flex>
    )
}