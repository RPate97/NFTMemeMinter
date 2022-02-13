import { Button, Text } from "@chakra-ui/react";
import { Link } from '@imtbl/imx-sdk';
import { MarketOrder, NFTMeme } from "src/utils/types";
import { ethers } from 'ethers';
import { EthIcon } from "src/components/custom-icons/eth";

type Props = {
    order: MarketOrder,
};

export const BuyButton: React.FC<Props> = ({order}) => {
    let price = order ? ethers.utils.formatEther(order.buy.data.quantity) : null;
    const link = new Link(process.env.NEXT_PUBLIC_LINK_ADDRESS);    
    const handleBuy = async () => {
        await link.buy({ orderIds: [order.order_id.toString()] });
    }

    return (
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
            p={4}
            onClick={handleBuy}>
            <Text color="white" fontSize="md" pr={2} m={0}>
                Buy
            </Text>  
            <Text color="gray.400" fontSize="md" fontWeight="bold" mr={2}>
                {price}
            </Text>
            <EthIcon width={20} height={20} /> 
        </Button>      
    );
}