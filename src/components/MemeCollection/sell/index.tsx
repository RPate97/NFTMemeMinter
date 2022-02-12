import { Button, Text } from "@chakra-ui/react";
import { Link } from '@imtbl/imx-sdk';
import { NFTMeme } from "src/utils/types";

type Props = {
    nftMeme: NFTMeme
};

export const SellButton: React.FC<Props> = ({nftMeme}) => {
    const link = new Link(process.env.NEXT_PUBLIC_LINK_ADDRESS);    
    const handleSell = () => {
        link.sell({
            tokenId: nftMeme.token_id,
            tokenAddress: nftMeme.token_address,
            amount: "1"
        });
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
            onClick={handleSell}>
            <Text color="white" fontSize="md" p={4} m={0}>
                Sell
            </Text>   
        </Button>      
    );
}