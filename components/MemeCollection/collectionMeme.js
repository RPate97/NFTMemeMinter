import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { Box, Image, Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { MemeModal } from "components/MemeCollection/memeModal";

export const CollectionMeme = ({userAddress, hash, score, uri, postings, memeId, experience, requiredExperience, danknessTier}) => {
    const gateway = "https://dankminter.mypinata.cloud/ipfs/";
    const gatewayURI = uri.replace('ipfs://', gateway);
    const [{ data, loading, error }, refetch] = useAxios(gatewayURI);
    const [imageURI, setImageURI] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (loading === false) {
            const newURI = data.image.replace('ipfs://', gateway);
            setImageURI(newURI);  
        }
    }, [data, loading, error, gatewayURI]);


    return (
        <div>
            { data && 
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
                        src={imageURI}
                        alt={data.name}
                    />                
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
                    experience={experience}
                    requiredExperience={requiredExperience}
                    danknessTier={danknessTier}
                    />       
            </Box>     
            }            
        </div>
    );
}
