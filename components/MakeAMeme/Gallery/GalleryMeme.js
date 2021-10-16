import React from 'react'
import Image from 'next/image'
import { Button, Box } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { MemeMinterModal } from "components/MakeAMeme/MinterModal";

export const GalleryMeme = ({userAddress, meme}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
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
                borderColor="gray.700"
                borderRadius="xl"
                m="0px"
                mr="0px"
                width="500"
                height="500"
                overflow="hidden">
                    <Image width={500} height={500} src={meme.src} alt={meme.src}/>                            
            </Button>     
            <MemeMinterModal userAddress={userAddress} meme={meme} isOpen={isOpen} onClose={onClose}/>
        </Box>
    )
}
