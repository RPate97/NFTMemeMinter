import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { Box, Image, Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { MemeModal } from "src/components/MemeCollection/memeModal";
import { NFTMeme } from "src/utils/types";

type Props = {
    nftMeme: NFTMeme,
}

export const CollectionMeme: React.FC<Props> = ({nftMeme}) => {
    const gatewayImage = nftMeme.image_url.replace('ipfs://', process.env.NEXT_PUBLIC_IMAGE_GATEWAY);
    const { isOpen, onOpen, onClose } = useDisclosure();
    console.log(gatewayImage);
    return (
        <div>
            { nftMeme && 
            <Box>
                <Button 
                    onClick={onOpen}
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
                        alt={nftMeme.name}
                    />                
                </Button>
                <MemeModal 
                    isOpen={isOpen}
                    onClose={onClose}
                    nftMeme={nftMeme}
                />       
            </Box>     
            }            
        </div>
    );
}
