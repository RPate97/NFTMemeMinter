import { Box, Flex, Text, Link, Button, Center } from "@chakra-ui/react";
import { MarketOrder } from 'src/utils/types';
import { MarketMeme } from 'src/pages/home/market/market-meme';
import { NFTMeme } from "src/utils/types";
import { ChevronRightIcon } from "@chakra-ui/icons";
import useAxios from 'axios-hooks';

type Props = {
    addMemeToCollection: (boughtMeme: NFTMeme) => void,
};

export const MemeMarket: React.FC<Props> = ({addMemeToCollection}) => {

    const [{ data: orders, loading, error }, refetchListings] = useAxios({
        url: `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        params: { 
            page_size: 10,
            order_by: "created_at",
            status: "active",
            sell_token_address: process.env.NEXT_PUBLIC_DANKMINTER_COLLECTION_CONTRACT_ADDRESS
        },
    });

    return (
        <Flex flexDirection="column">
            <Flex flexDirection="row" alignItems="center" height="80px">
                <Text color="white" fontSize="4xl" ml={5} mr={3} fontFamily="space_monoregular">
                    Dank Market
                </Text>          
                {/* <Button
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
                    px={0}
                    height="30px">
                    <Link href='/market' passHref>
                        <ChevronRightIcon color="white" boxSize="2em" />                                     
                    </Link>
                </Button>  */}
            </Flex>
            <Flex flexDirection="row">
            {orders && orders.result && orders.result.length > 0 
                ? <Box
                    padding={2}
                    w="100%"
                    mx="auto"
                    marginTop={0}
                    sx={{ columnCount: [1, 2, 3, 4], columnGap: "8px" }}
                >
                    {orders.result.map((el: MarketOrder) => {
                        return (
                            <MarketMeme 
                                key={el.sell.data.token_id} 
                                order={el} 
                                refetchListings={refetchListings}
                                addMemeToCollection={addMemeToCollection}
                            />
                        )
                    })}             
                </Box> 
            : <></>} 
            </Flex>
      </Flex>
    );
}