import React from 'react'
import { Button, Box, Text, Tooltip } from "@chakra-ui/react";
import { AppColors } from "styles/styles";
import Image from "next/image";
import Link from 'next/link';

export const DiscordButton = () => {
    return (
        <Box>
            <Tooltip 
                bg={AppColors.buttonBackground}
                borderRadius="xl"
                border="1px"
                borderColor="gray.700"
                label="Wanna vibe?">
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
                        height="40px"
                        px={4}>
                        <Link href='https://discord.gg/mrnCagneyr'>
                            <Image src="/icons/discord.svg" alt="Discord logo" width="100px" height="50px" />
                        </Link>
                    </Button>                          
            </Tooltip>
        </Box>
    )
}