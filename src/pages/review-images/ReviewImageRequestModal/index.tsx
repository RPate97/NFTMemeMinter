
import React, { useState } from "react";
import {
    Box,
    Button,
    useDisclosure,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Center,
    Spinner,
    Input,
} from "@chakra-ui/react";
import { Dropzone } from 'src/components/common-ui/dropzone';
import { AppColors } from "styles/styles";
import { CloseIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { MinterImage } from 'src/components/common-ui/minter-image';
import { ImageRequest } from "src/utils/types";
const axios = require('axios');

type Props = {
    onClose: () => void,
    isOpen: boolean,
    imageRequest: ImageRequest,
};

export const ReviewImageRequestModal: React.FC<Props> = ({isOpen, onClose, imageRequest}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [successful, setSuccessful] = useState<boolean>(false);
    const [base64URL, setBase64URL] = useState<string>("");
    const [imageName, setImageName] = useState<string>(imageRequest.name);
    const [didApprove, setDidApprove] = useState<boolean>();

    let token: string;
    // get token
    if (typeof(Storage) !== "undefined") {
        token = localStorage.getItem("token");
    }

    const approveImage = async () => {
        imageRequest.name = imageName;
        setLoading(true);

        await axios.post('/api/admin/approveImageRequest', {imageRequest: imageRequest, imageRequestId: imageRequest._id})
        .then(function (response) {
            setDidApprove(true);
            setLoading(false);
            setSuccessful(true);
        })
        .catch(function (error) {
            setLoading(false);
            console.log(error);
        });
    }

    const denyImage = async () => {
        setLoading(true);
        await axios.post('/api/admin/rejectImageRequest', {imageRequest: imageRequest, imageRequestId: imageRequest._id})
        .then(function (response) {
            setDidApprove(false);
            setLoading(false);
            setSuccessful(true);
        })
        .catch(function (error) {
            setLoading(false);
            console.log(error);
        });
    }

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
                borderRadius="3xl">
                <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
                    Approve a new meme image
                </ModalHeader>
                <ModalCloseButton
                    color="white"
                    fontSize="sm"
                    _hover={{
                        color: "whiteAlpha.700",
                    }}
                />
                <ModalBody p={0} m={0} alignContent="center">
                    <Center>
                        {loading === true 
                        ? <Flex flexDirection="column" alignItems="center" my={10}>
                            <Spinner color="white" size="xl"/>
                            <Text mt={3} fontWeight="bold" color="white" size="xl" textAlign="center">Submitting...</Text>
                        </Flex>
                        : successful === true 
                        ? <Flex flexDirection="column" alignItems="center" m={10}>
                            <CheckCircleIcon color="green.500" boxSize="5em" />
                            <Text color="white" size="xl" textAlign="center"></Text>
                            <Text mt={3} fontWeight="bold" color="white" size="md" textAlign="center">{didApprove ? "Approved!" : "Denied!"}</Text>
                        </Flex>
                        : <Flex flexDirection="column" alignItems="center" mb={6}>
                            <Box
                                backgroundColor="#0e0e0e"
                                borderRadius="3xl"
                                border="3px"
                                borderStyle="solid"
                                borderColor="gray.600"
                                px={0}
                                pt={0}
                                pb={0}
                                mb={3}
                                mt={0}
                                width={imageRequest.width + 5}
                                height={imageRequest.height}
                                overflow="hidden"
                                boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
                            >
                                <Flex flexDirection="column" justifyContent="space-between" alignItems="center" mt={0} width={imageRequest.width} height={imageRequest.height}>
                                    <MinterImage
                                        src={imageRequest.src}
                                        height={imageRequest.height}
                                        width={imageRequest.width}
                                    />
                                </Flex>
                            </Box>
                            <Flex flexDirection="column" alignItems="center">
                                <Input value={imageName} my={3} width={420} color="white" variant="outline" placeholder="Name your image so others can find it" maxLength={60} onChange={(e) => setImageName(e.currentTarget.value)} />
                                <Button
                                    onClick={denyImage}
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
                                    px={3}
                                    mt={2}
                                    height="38px"
                                    width="fit-content">
                                    <Text color="white" fontSize="md">
                                        Deny
                                    </Text>                                  
                                </Button>  
                                <Button
                                    onClick={approveImage}
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
                                    px={3}
                                    mt={2}
                                    height="38px"
                                    width="fit-content">
                                    <Text color="white" fontSize="md">
                                        Approve
                                    </Text>                                  
                                </Button> 
                            </Flex>
                        </Flex>}
                    </Center>
                </ModalBody>
            </ModalContent>
        </Modal>  
    );
}
