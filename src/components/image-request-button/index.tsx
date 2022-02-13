
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
const axios = require('axios');

type Props = {
    
};

export const ImageRequestButton: React.FC<Props> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState<boolean>(false);
    const [successful, setSuccessful] = useState<boolean>(false);
    const [memeWidth, setMemeWidth] = useState<number>(500);
    const [memeHeight, setMemeHeight] = useState<number>(500);
    const [base64URL, setBase64URL] = useState<string>("");
    const [imageName, setImageName] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState();

    let token: string;
    // get token
    if (typeof(Storage) !== "undefined") {
        token = localStorage.getItem("token");
    }

    const requestImage = async () => {
        setLoading(true);

        var formData = new FormData();
        formData.append("image", selectedFile);

        var imageInfo = {
            src: null,
            width: memeWidth,
            height: memeHeight,
            name: imageName,
        };
        formData.append("imageInfo", JSON.stringify(imageInfo));
        formData.append("token", token);

        // upload template to mongodb
        await axios.put('/api/requestImage', formData, { headers: {
            'Content-Type': 'multipart/form-data'
          }})
          .then(function (response) {
                setLoading(false);
                setSuccessful(true);  
          })
          .catch(function (error) {
              console.log(error);
                setLoading(false);
          });
    }

    const changeImage = (files) => {
        var reader = new FileReader();
        reader.onload = (e) => {
            var img = new Image();    
            img.onload = () => {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                var dataURL = canvas.toDataURL("image/png");
                var height = (500 / (img.width / img.height));

                setBase64URL(dataURL);
                setSelectedFile(files[0]);
                setMemeWidth(500);
                setMemeHeight(height);       
            }
            img.src = e.target.result.toString();
        }
        reader.readAsDataURL(files[0]);
    }

    const removeImage = () => {
        setBase64URL("");
    }

    return (
        <>
           <Button 
                color="white"
                bg="transparent"
                border="1px solid white"
                _hover={{
                    border: "1px",
                    borderStyle: "solid",
                    borderColor: "white",
                    backgroundColor: "gray.700",
                }}
                borderRadius="xl"
                marginBottom={0}
                ml={5}
                onClick={onOpen}>
                Request An Image
            </Button>
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
                        Request a new meme image
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
                                <Text mt={3} fontWeight="bold" color="white" size="md" textAlign="center">{"Thanks for your suggestion. We'll approve it as quickly as we can."}</Text>
                                <Text mt={3} color="white" size="sm" textAlign="center">{"You'll receive an email as soon as it is approved."}</Text>
                                <Text mt={3} color="white" size="sm" textAlign="center">{"If your wondering why your image needs to be approved... It's because people like to upload the same image multiple times so they can make FAKE memes. We can't have that."}</Text>
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
                                    width={memeWidth + 5}
                                    height={memeHeight}
                                    overflow="hidden"
                                    boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
                                >
                                    <Flex flexDirection="column" justifyContent="space-between" alignItems="center" mt={0} width={memeWidth} height={memeHeight}>
                                        {base64URL ? <div
                                            style={{
                                                position: "relative", 
                                                top: 0, 
                                                left: 0, 
                                                width: memeWidth,
                                                height: `${memeHeight}px`,
                                            }}>
                                            <MinterImage
                                                src={base64URL}
                                                height={memeHeight}
                                                width={memeWidth}
                                            />
                                            <Button
                                                position="absolute"
                                                top={0}
                                                right={0}
                                                onClick={removeImage}
                                                border="1px solid transparent"
                                                backgroundColor="transparent"
                                                _hover={{}}
                                                _active={{}}
                                                _focus={{}}
                                                _focusWithin={{}}
                                                m="0px"
                                                mx="5px"
                                                px={3}
                                                mt={2}
                                                zIndex={5}
                                                height="38px"
                                                width="fit-content">
                                                <CloseIcon 
                                                    color="white"
                                                    _hover={{
                                                        color: "whiteAlpha.700",
                                                    }}
                                                    w={6} 
                                                    h={6} />                                 
                                            </Button>  
                                        </div> : <Dropzone changeImage={changeImage}/>}
                                    </Flex>
                                </Box>
                                {base64URL && 
                                <Flex flexDirection="column" alignItems="center">
                                    <Input value={imageName} my={3} width={420} color="white" variant="outline" placeholder="Name your image so others can find it" maxLength={60} onChange={(e) => setImageName(e.currentTarget.value)} />
                                    <Button
                                        onClick={requestImage}
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
                                            Submit Request
                                        </Text>                                  
                                    </Button>  
                                </Flex>
                                }
                            </Flex>}
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>  
        </>
    );
}
