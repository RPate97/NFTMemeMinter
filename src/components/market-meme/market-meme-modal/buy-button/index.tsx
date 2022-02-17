import { Button, Text, useToast, Box, Spinner, Flex } from "@chakra-ui/react";
import { Link } from '@imtbl/imx-sdk';
import { MarketOrder, NFTMeme } from "src/utils/types";
import { ethers } from 'ethers';
import { EthIcon } from "src/components/custom-icons/eth";
import { useState } from "react";
import { USDCIcon } from "components/custom-icons/usdc";
import { AxiosPromise, AxiosRequestConfig } from "axios";
import { RefetchOptions } from "axios-hooks";

type Props = {
    order: MarketOrder,
    refetchListings: (config?: AxiosRequestConfig<any>, options?: RefetchOptions) => AxiosPromise<any>
    addMemeToCollection: (boughtMeme: NFTMeme) => void,
    nftMeme: NFTMeme,
};

export const BuyButton: React.FC<Props> = ({order, refetchListings, addMemeToCollection, nftMeme}) => {
    const toast = useToast();
    const [mutating, setMutating] = useState<boolean>(false);
    let price = "0";
    let currency = "ETH";
    if (order && order.buy.data.token_address === process.env.NEXT_PUBLIC_USDC_ADDRESS) {
        currency = "USDC";
        price = ethers.utils.formatUnits(order.buy.data.quantity, 6);
    } else {
        currency = "ETH";
        price = ethers.utils.formatEther(order.buy.data.quantity);
    }

    const link = new Link(process.env.NEXT_PUBLIC_LINK_ADDRESS);    
    const handleBuy = async () => {
        try {    
            setMutating(true);
            await link.buy({ orderIds: [order.order_id.toString()] });
            toast({
                position: 'bottom-left',
                render: () => (
                  <Box color='white' p={3} bg='green.500' borderRadius="md" boxShadow="md">
                    Purchase completed!
                  </Box>
                ),
            });
            setTimeout(async () => {
                await refetchListings(null, {
                    useCache: false,
                });
                addMemeToCollection(nftMeme);
                setMutating(false);
            }, 3000);
        } catch (e) {
            toast({
                position: 'bottom-left',
                render: () => (
                <Box color='white' p={3} bg='blue.500' borderRadius="md" boxShadow="md">
                    Cancelled Purchase
                </Box>
                ),
            });
            setMutating(false);
        }
    }

    return (
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
                mr="5px"
                height="40px"
                p={4}
                onClick={handleBuy}>
                <Text color={!mutating ? "white" : "gray.400"} fontSize="md" pr={2} m={0}>
                    Buy
                </Text>  
                <Text color={!mutating ? "white" : "gray.400"} fontSize="md" fontWeight="bold" mr={2}>
                    {price}
                </Text>
                {currency === "USDC" ? <USDCIcon width={20} height={20} /> : <EthIcon width={20} height={20} /> }
            </Button>  
        </Flex>    
    );
}