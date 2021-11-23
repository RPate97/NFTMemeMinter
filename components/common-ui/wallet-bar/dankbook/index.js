import React from 'react'
import { Button, Box, Text, Tooltip } from "@chakra-ui/react";
import { AppColors } from "styles/styles";
import { useDisclosure } from "@chakra-ui/react";
import { DankBookModal } from './dankbook-modal';

export const DankBookButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box>
            <Tooltip 
                bg={AppColors.buttonBackground}
                borderRadius="xl"
                border="1px"
                borderColor="gray.700"
                label="Open the DankBook.">
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
                    p={0}
                    onClick={onOpen}>
                    <Text color="white" fontSize="md" p={4} m={0}>
                        DankBook
                    </Text>                                                 
                </Button>
            </Tooltip>
            <DankBookModal isOpen={isOpen} onClose={onClose} />                
        </Box>
    )
}