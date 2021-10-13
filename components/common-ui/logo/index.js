import React from 'react'
import { styles } from 'styles/styles'
import { Flex } from "@chakra-ui/react";

export const Logo = () => {
    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            h="20"
            marginLeft="3">
            <h1 style={styles.walletBar.logo}>
                DankMinter          
            </h1>            
        </Flex>
    )
}