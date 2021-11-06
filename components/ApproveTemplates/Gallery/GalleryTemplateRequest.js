import React from 'react'
import { Button, Box, Image } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import ReviewTemplateRequestModal from 'components/ApproveTemplates/ReviewTemplateRequestModal';

export const GalleryTemplateRequest = ({template}) => {
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
                    src={template.src}
                    alt="Alt"
                />                
            </Button>
            <ReviewTemplateRequestModal template={template} isOpen={isOpen} onClose={onClose} />
        </Box>
    )
}
