import { Flex, Text, Button } from "@chakra-ui/react";
import { MarketOrder } from "src/utils/types";
import { ethers } from 'ethers';
import { Link } from '@imtbl/imx-sdk';
import { EthIcon } from "components/custom-icons/eth";

type Props = {
    order: MarketOrder
}

export const CancelSale: React.FC<Props> = ({order}) => {
    let price = order ? ethers.utils.formatEther(order.buy.data.quantity) : null;
    const link = new Link(process.env.NEXT_PUBLIC_LINK_ADDRESS);    

    const handleCancel = async () => {
        await link.cancel({orderId: order.order_id.toString()});
    }

    return (
        <Flex flexDirection="row" justifyContent="space-between" width="100%">
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
                p={0}
                onClick={handleCancel}>
                <Text color="white" fontSize="md" p={4} m={0}>
                    Cancel Sale
                </Text>   
            </Button>
            <Flex flexDirection="row" alignItems="center">
                <Text color="gray.400" fontSize="md" fontWeight="bold" ml={1} mr={2} textAlign="left">
                    For sale: {price}
                </Text>
                <EthIcon width={20} height={20} />                
            </Flex>
        </Flex>
    )
}