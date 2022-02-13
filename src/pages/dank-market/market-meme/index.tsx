import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { Box, Image, Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { MarketOrder, NFTMeme } from "src/utils/types";
import { MarketMemeModal } from './market-meme-modal';

type Props = {
    order: MarketOrder,
}

export const MarketMeme: React.FC<Props> = (props) => {
    const gatewayImage = props.order.sell.data.properties.image_url.replace('ipfs://', process.env.NEXT_PUBLIC_IMAGE_GATEWAY);
    const tokenId = props.order.sell.data.token_id;
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [{ data, loading, error }] = useAxios({
        url: `${process.env.NEXT_PUBLIC_API_URL}/assets/${process.env.NEXT_PUBLIC_DANKMINTER_COLLECTION_CONTRACT_ADDRESS}/${tokenId}`,
    });

    return (
        <div>
            <Box>
                <Button 
                    onClick={() => {
                        if (data) {
                            onOpen();
                        }
                    }}
                    bg="transparent"
                    border="1px solid transparent"
                    _hover={{
                        border: "1px",
                        borderStyle: "solid",
                        borderColor: "white",
                        backgroundColor: "gray.700",
                    }}
                    borderRadius="xl"
                    m={0}
                    p={0}
                    mb={2}
                    width="fit-content"
                    height="fit-height">
                    <Image
                        key="src"
                        w="100%"
                        borderRadius="xl"
                        mb={0}
                        d="inline-block"
                        src={gatewayImage}
                        alt={props.order.sell.data.properties.name}
                    />                
                </Button>
                {data !== undefined && <MarketMemeModal
                    isOpen={isOpen}
                    onClose={onClose}
                    nftMeme={data}
                    order={props.order}
                />}      
            </Box>     
        </div>
    );
}
