import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { Box, Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { MemeModal } from "src/components/MemeCollection/memeModal";
import { NFTMeme, UserProfile } from "src/utils/types";
import Image from "next/image";

type Props = {
    nftMeme: NFTMeme,
    userProfile: UserProfile
}

export const CollectionMeme: React.FC<Props> = ({nftMeme, userProfile}) => {
    const [loaded, setLoaded] = useState(false);
    const [width, setWidth] = useState(350);
    const [height, setHeight] = useState(350);
    const gatewayImage = nftMeme.image_url.replace('ipfs://', process.env.NEXT_PUBLIC_IMAGE_GATEWAY);
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            { nftMeme && 
            <Box m={1}>
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
                    overflow="clip"
                    m={0}
                    p={0}
                    mb={2}
                    height={height}
                    width={width}>
                    <Image
                        key="src"
                        height={height}
                        width={width}
                        src={gatewayImage}
                        alt={nftMeme.name}
                        onLoadingComplete={({ naturalWidth, naturalHeight }) => {
                            if (!loaded) {
                                console.log("loaded");
                                console.log(naturalWidth);
                                console.log(naturalHeight);
                                const ratio = (naturalWidth / naturalHeight);
                                setLoaded(true);
                                setWidth(350 * ratio);
                                setHeight(350);                                
                            }
                        }}
                    />                
                </Button>
                <MemeModal 
                    isOpen={isOpen}
                    onClose={onClose}
                    nftMeme={nftMeme}
                    userProfile={userProfile}
                />       
            </Box>     
            }            
        </>
    );
}
