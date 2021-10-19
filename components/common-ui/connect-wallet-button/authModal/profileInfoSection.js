import React, { useState } from 'react';
import {
    Box,
    Button,
    Flex,
    ModalBody,
    Text,
    Input,
  } from "@chakra-ui/react";

export const ProfileInfoSection = ({updateProfile}) => {
    const [handle, setHandle] = useState("");

    return (
        <ModalBody pt={0} px={4}>
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
                <Box
                    borderRadius="3xl"
                    border="1px"
                    borderStyle="solid"
                    borderColor="gray.600"
                    px={5}
                    pt={4}
                    pb={2}
                    mb={3}
                >
                    <Flex flexDirection="column" justifyContent="space-between" alignItems="center" mb={3} pl={5} pr={5}>
                        <Text color="white" fontSize="20" overflowWrap="anywhere" textAlign="center" mt={3}>
                            {"Set your creator handle so we can watermark your memes:"}
                        </Text>
                        <Input mt={3} color="white" value={handle} bgColor="transparent" placeholder="@dankminter" onChange={(e) => setHandle(e.target.value)}/>
                    </Flex>
                </Box>
                <Button
                    onClick={() => updateProfile(handle)}
                    bg="transparent"
                    border="1px solid white"
                    _hover={{
                        border: "1px",
                        borderStyle: "solid",
                        borderColor: "white",
                        backgroundColor: "gray.700",
                    }}
                    borderRadius="xl"
                    m="0px"
                    height="38px"
                    p={0}
                    pb="1px">
                    <Text color="white" fontSize="md" p={4} m={0}>
                        Set Handle
                    </Text>   
                </Button> 
            </Flex> 
        </ModalBody>
    );
}