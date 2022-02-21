import React from 'react';
import { Button, Box, Text, Tooltip, Flex, Spinner } from "@chakra-ui/react";
import { AppColors } from "styles/styles";
import { Link, ExchangeCurrency } from '@imtbl/imx-sdk';
import { useToast } from '@chakra-ui/react';
import { useState } from "react";

export const BuyCryptoButton = () => {
    const toast = useToast();
    const [mutating, setMutating] = useState<boolean>(false);
    const link = new Link(process.env.NEXT_PUBLIC_LINK_ADDRESS);

    const handleBuyCrypto = async () => {
        try {
            setMutating(true);
            await link.fiatToCrypto({cryptoCurrencies: [ExchangeCurrency.ETH, ExchangeCurrency.USDC]});
            toast({
                position: 'bottom-left',
                render: () => (
                  <Box color='white' p={3} bg='green.500' borderRadius="md" boxShadow="md">
                    Purchase completed!
                  </Box>
                ),
            });
            setMutating(false);
        } catch (e) {
            toast({
                position: 'bottom-left',
                render: () => (
                  <Box color='white' p={3} bg='blue.500' borderRadius="md" boxShadow="md">
                    Cancelled Crypto Purchase
                  </Box>
                ),
            });
            setMutating(false);
        }
    }

    return (
        <>
            <Box>
                <Tooltip 
                    bg={AppColors.buttonBackground}
                    borderRadius="xl"
                    border="1px"
                    borderColor="gray.700"
                    label="Taste the rainbow 🍭">
                    <Flex flexDirection="row" alignItems="center">
                        {mutating && <Spinner color="white" mr={2} />}
                        <Button
                            disabled={mutating}
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
                            mr="0px"
                            px={3}
                            height="40px"
                            onClick={handleBuyCrypto}>
                            <Text color="white" fontSize="md">
                                {"Buy Crypto"}
                            </Text>                           
                        </Button>  
                    </Flex>              
                </Tooltip>
            </Box>
        </>
    )
}