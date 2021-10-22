import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { Box, Text, Spacer, Flex, Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { MemeModal } from "components/MemeCollection/memeModal";

export const CollectionMeme = ({userAddress, hash, score, uri, postings, memeId}) => {
    console.log("hash:");
    console.log(hash);
    const gateway = "https://dankminter.mypinata.cloud/ipfs/";
    const gatewayURI = uri.replace('ipfs://', gateway);
    const [{ data, loading, error }, refetch] = useAxios(gatewayURI);
    const [imageURI, setImageURI] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (loading === false) {
            // console.log(gatewayURI);
            // console.log("data:");
            // console.log(data);
            // console.log(loading);
            // console.log(error);
            const newURI = data.image.replace('ipfs://', gateway);
            setImageURI(newURI);  
            // console.log(newURI);          
        }
    }, [data, loading, error, gatewayURI]);

    return (
        <div>
            { data && 
                <Box display="flex"
                    flexDirection="column"
                    alignItems="end"
                    border="1px"
                    borderColor="gray.700"
                    backgroundColor="gray.900"
                    borderRadius="xl"
                    width="-webkit-fit-content"
                    py="0"
                    overflow="hidden"
                    _hover={{
                        border: "1px",
                        borderStyle: "solid",
                        borderColor: "white",
                        backgroundColor: "gray.700",
                    }}>
                    <Button 
                        onClick={onOpen} 
                        width={500} 
                        height={500} 
                        bg="transparent"
                        margin="0px"
                        padding={0}>
                        <img width={500} height={500} src={imageURI} alt={data.name}/> 
                    </Button>
                    <MemeModal 
                        userAddress={userAddress}
                        isOpen={isOpen}
                        onClose={onClose}
                        hash={hash}
                        score={score}
                        postings={postings}
                        memeId={memeId}
                        imageURI={imageURI}
                        name={data.name}
                        description={data.description}
                        creatorName={data.attributes[0].value}
                        printNum={data.attributes[1].value}
                        creationDate={data.attributes[2].value}
                        totalMinted={data.attributes[3].value}
                        />       
                </Box>     
            }            
        </div>
    );
}
