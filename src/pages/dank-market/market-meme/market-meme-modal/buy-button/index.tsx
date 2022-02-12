import { Button, Text } from "@chakra-ui/react";
import { Link } from '@imtbl/imx-sdk';
import { MarketOrder, NFTMeme } from "src/utils/types";
import { ethers } from 'ethers';

type Props = {
    order: MarketOrder,
};

export const BuyButton: React.FC<Props> = ({order}) => {
    console.log(order);

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
            p={0}
            onClick={handleBuy}>
            <Text color="white" fontSize="md" p={4} m={0}>
                Buy
            </Text>   
        </Button>      
    );
}