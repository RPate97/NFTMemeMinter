import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Center,
} from "@chakra-ui/react";
import { AppColors } from "styles/styles";
import { stickers } from "src/utils/properties";
import { ImageButton } from "src/components/MakeAMeme/FreeStyleModal/selectImageModal/imageButton";
import { LayoutSection, LayoutImage } from "src/utils/types";
import { useState, useEffect } from "react";
const axios = require('axios');

type Props = {
    isOpen: boolean,
    onClose: () => void,
    layoutSection: LayoutSection,
    addLayoutImage: (index: number, newSrc: string, newId: string, imageWidth: number, imageHeight: number) => void,
    removeLayoutImage:  (index: number) => void,
    layoutIndex: number,
    token: string,
}

export const SelectLayoutImage: React.FC<Props> = ({isOpen, onClose, layoutSection, addLayoutImage, removeLayoutImage, layoutIndex, token}) => {
    const [page, setPage] = useState(1);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchData = () => {
            axios.post(`/api/fetchImages?page=${page}`, { token: token })
                .then((res) => {
                    setResponse(res.data);
                })
                .catch((err) => {
                    console.log(err);
                    setError(err);
                })
                .finally(() => {
                    setloading(false);
                });
        }
        if (token) {
            fetchData();
        }
    }, [page, token]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent
                background={AppColors.buttonBackground}
                backgroundSize="cover"
                border="1px"
                borderStyle="solid"
                borderColor="gray.700"
                alignContent="center"
                borderRadius="3xl"
                overflow="hidden">
                <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
                    Select An Image
                </ModalHeader>
                <ModalCloseButton
                    color="white"
                    fontSize="sm"
                    _hover={{
                        color: "whiteAlpha.700",
                    }}
                />
                <Center>
                    <ModalBody p={0} m={0} alignContent="center" width="min-content">
                        {response && response?.images?.map((img: LayoutImage) => {
                            return (
                                <ImageButton 
                                    key={img._id}
                                    image={img} 
                                    onClose={onClose} 
                                    layoutSection={layoutSection} 
                                    addLayoutImage={addLayoutImage} 
                                    removeLayoutImage={removeLayoutImage}
                                    layoutIndex={layoutIndex}
                                />
                            );
                        })}
                    </ModalBody>
                </Center>
            </ModalContent>
        </Modal>  
    )
}