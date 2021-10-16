import React from 'react'
import { Button, Box, Text, Tooltip } from "@chakra-ui/react";
import { AppColors } from "styles/styles";
import Link from 'next/link';

export const VoteButton = () => {
    return (
        <Box>
            <Tooltip 
                bg={AppColors.buttonBackground}
                borderRadius="xl"
                border="1px"
                borderColor="gray.700"
                label="Earn TreeFiddies voting for the best and worst memes.">
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
                    ml="1px"
                    height="38px"
                    p={0}>
                    <Link href='/vote'>
                        <Text color="white" fontSize="md" p={4} m={0}>
                            Vote
                        </Text>                         
                    </Link>
                                 
                </Button>                
            </Tooltip>
        </Box>
    )
}