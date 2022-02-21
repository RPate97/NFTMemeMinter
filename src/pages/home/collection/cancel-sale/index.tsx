import { 
    Flex, 
    Text, 
    Button, 
    Box,
    useToast,
    Spinner 
} from "@chakra-ui/react";
import { MarketOrder } from "src/utils/types";
import { ethers } from 'ethers';
import { Link } from '@imtbl/imx-sdk';
import { EthIcon } from "components/custom-icons/eth";
import { useState } from "react";
import { USDCIcon } from "components/custom-icons/usdc";
import { AxiosPromise, AxiosRequestConfig } from "axios";
import { RefetchOptions } from "axios-hooks";

type Props = {
    order: MarketOrder,
    refetch: (config?: AxiosRequestConfig<any>, options?: RefetchOptions) => AxiosPromise<any>
}

export const CancelSale: React.FC<Props> = ({order, refetch}) => {
    const toast = useToast();
    const [mutating, setMutating] = useState<boolean>(false);
    const link = new Link(process.env.NEXT_PUBLIC_LINK_ADDRESS);    

    let price = "0";
    let currency = "ETH";
    if (order && order.buy.data.token_address === process.env.NEXT_PUBLIC_USDC_ADDRESS) {
        currency = "USDC";
        price = ethers.utils.formatUnits(order.buy.data.quantity, 6);
    } else {
        currency = "ETH";
        price = ethers.utils.formatEther(order.buy.data.quantity);
    }

    const handleCancel = async () => {
        try {
            setMutating(true);
            await link.cancel({orderId: order.order_id.toString()});
            toast({
                position: 'bottom-left',
                render: () => (
                  <Box color='white' p={3} bg='green.500' borderRadius="md" boxShadow="md">
                    Sale cancelled!
                  </Box>
                ),
            });
            setTimeout(async () => {
                await refetch(null, {
                    useCache: false,
                });
                setMutating(false);
            }, 3000);
        } catch (e) {
            toast({
                position: 'bottom-left',
                render: () => (
                <Box color='white' p={3} bg='blue.500' borderRadius="md" boxShadow="md">
                    Sale not cancelled
                </Box>
                ),
            });
            setMutating(false);
        }
    }

    return (
        <Flex flexDirection="row" justifyContent="space-between" width="100%">
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
                    p={0}
                    onClick={handleCancel}>
                    <Text color={!mutating ? "white" : "gray.400"} fontSize="md" p={4} m={0}>
                        Cancel Sale
                    </Text>   
                </Button>
            </Flex>
            <Flex flexDirection="row" alignItems="center">
                <Text color="white" fontSize="md" fontWeight="bold" ml={1} mr={2} textAlign="left">
                    For sale: {price}
                </Text>
                {currency === "USDC" ? <USDCIcon width={20} height={20} /> : <EthIcon width={20} height={20} /> }            
            </Flex>
        </Flex>
    )
}