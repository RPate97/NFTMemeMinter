import React from 'react';
import { MinterAutoSizedText } from 'src/components/MakeAMeme/MinterModal/MinterAutoSizedText';
import { MinterImage } from "src/pages/common-ui/minter-image";
import { AppColors } from "styles/styles";
import {
    Box,
    Button,
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
import { CloseIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { Dropzone } from 'src/components/common-ui/dropzone';

const axios = require('axios');

export default class TemplateMakerModal extends React.Component {
    constructor(props) {
        super(props);
        var memeWidth = 500;
        var memeHeight = 500;
        this.state = {
            borderStyle: {
                border: "solid 1px #ddd",
                borderStyle: "dashed",
                borderRadius: 10,
            },
            textLocations: [],
            templateId: 1,
            memeWidth: memeWidth,
            memeHeight: memeHeight,
            hashCaptions: ["", ""],
            tabIndex: 0,
            mainCaption: "",
            templateName: "",
            loading: false,
            successful: false,
        };

        // get token
        if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            this.token = localStorage.getItem("token");
        }

        this.requestTemplate = this.requestTemplate.bind(this);
        this.changeRotation = this.changeRotation.bind(this);
        this.changeSectionSize = this.changeSectionSize.bind(this);
        this.changeSectionLocation = this.changeSectionLocation.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.changeImage = this.changeImage.bind(this);
        this.addTextSection = this.addTextSection.bind(this);
        this.removeTextSection = this.removeTextSection.bind(this);
    }

    changeTemplateName = (newName) => {
        this.setState(prevState => ({
            ...prevState,
            templateName: newName
        }));
    }

    changeRotation(newRotation, index) {
        this.setState(prevState => ({
            ...prevState,
            textLocations: prevState.textLocations.map(el => el.key === index ? { ...el, rotation: newRotation } : el)
        }));
    }

    changeSectionSize(newWidth, newHeight, index) {
        /*eslint-disable */
        this.state.textLocations[index].height = newHeight; 
        this.state.textLocations[index].width = newWidth;
        /*eslint-enable */
    }

    changeSectionLocation(newX, newY, index) {
        /*eslint-disable */
        this.state.textLocations[index].x = newX;
        this.state.textLocations[index].y = newY;
        /*eslint-enable */
    }

    removeImage() {
        this.setState(prevState => ({
            ...prevState,
            base64URL: "",
        }));
    }

    changeImage(files) {
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
                this.setState(prevState => ({
                    ...prevState,
                    base64URL: dataURL,
                    selectedFile: files[0],
                    memeWidth: 500,
                    memeHeight: height,
                }));            
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(files[0]);
    }

    addTextSection() {
        var newKey = this.state.textLocations.length;
        var x = this.state.memeWidth / 2 - 100 + this.state.textLocations.length * 20;
        var y = this.state.memeHeight / 2 - 100 + this.state.textLocations.length * 20;
        var label = "Caption here";
        var newTextSection = {
            x: x,
            y: y,
            text: label,
            rotation: 0,
            height: 70,
            width: 200,
            key: newKey,
        };
        this.setState(prevState => ({
            ...prevState,
            textLocations: [
                ...prevState.textLocations,
                newTextSection,
            ]
        }));
    }

    removeTextSection() {
        var newSections = this.state.textLocations;
        newSections.pop();
        this.setState(prevState => ({
            ...prevState,
            textLocations: newSections,
        }));
    }

    async requestTemplate() {
        this.setState(prevState => ({
            ...prevState,
            loading: true,
        }));
        var formData = new FormData();
        formData.append("image", this.state.selectedFile);
        let correctTextLocations = [];
        this.state.textLocations.forEach((el) => {
            let textLocation = el;
            el.label = "";
            correctTextLocations.push(el)
        });
        var template = {
            src: null,
            width: this.state.memeWidth,
            height: this.state.memeHeight,
            textLocations: correctTextLocations,
            templateName: this.state.templateName,
        };
        formData.append("template", JSON.stringify(template));
        formData.append("token", this.token);

        let localThis = this;
        // upload template to mongodb
        await axios.put('/api/requestTemplate', formData, { headers: {
            'Content-Type': 'multipart/form-data'
          }})
          .then(function (response) {
            localThis.setState(prevState => ({
                ...prevState,
                loading: false,
                successful: true,
            }));   
          })
          .catch(function (error) {
            localThis.setState(prevState => ({
                ...prevState,
                loading: false,
            }));  
          });
    }

    render() {
        const { isOpen, onClose } = this.props;
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
                        Request a new template
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
                            {this.state.loading === true 
                            ? <Flex flexDirection="column" alignItems="center" my={10}>
                                <Spinner color="white" size="xl"/>
                                <Text mt={3} fontWeight="bold" color="white" size="xl" textAlign="center">Submitting...</Text>
                            </Flex>
                            : this.state.successful === true 
                            ? <Flex flexDirection="column" alignItems="center" my={10}>
                                <CheckCircleIcon color="green.500" boxSize="5em" />
                                <Text color="white" size="xl" textAlign="center"></Text>
                                <Text mt={3} fontWeight="bold" color="white" size="md" textAlign="center">{"Thanks for your suggestion. We'll approve it as quickly as we can."}</Text>
                                <Text mt={3} color="white" size="sm" textAlign="center">{"You'll receive an email as soon as it is approved."}</Text>
                                <Text mt={3} color="white" size="sm" textAlign="center">{"If your wondering why your request needs to be approved... It's because people like to upload images that aren't really templates :/ This is why we can't have nice things."}</Text>
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
                                    width={this.state.memeWidth + 5}
                                    height={this.state.memeHeight}
                                    overflow="hidden"
                                    boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
                                >
                                    <Flex flexDirection="column" justifyContent="space-between" alignItems="center" mt={0} width={this.state.memeWidth} height={this.state.memeHeight}>
                                        {this.state.base64URL ? <div
                                            style={{
                                                position: "relative", 
                                                top: 0, 
                                                left: 0, 
                                                width: this.state.memeWidth,
                                                height: `${this.state.memeHeight}px`,
                                            }}>
                                            <MinterImage
                                                src={this.state.base64URL}
                                                height={this.state.memeHeight}
                                                width={this.state.memeWidth}
                                            />
                                            <Button
                                                position="absolute"
                                                top={0}
                                                right={0}
                                                onClick={this.removeImage}
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
                                            {this.state.textLocations.map((el, index) => (
                                                <MinterAutoSizedText 
                                                    borderStyle={this.state.borderStyle}
                                                    text={el.text} 
                                                    rotation={el.rotation} 
                                                    height={el.height} 
                                                    width={el.width} 
                                                    x={el.x}
                                                    y={el.y}
                                                    id={el.key}
                                                    key={el.key}
                                                    changeSectionLocation={this.changeSectionLocation}
                                                    changeSectionSize={this.changeSectionSize}
                                                    />                            
                                            ))}
                                        </div> : <Dropzone changeImage={this.changeImage}/>}
                                    </Flex>
                                </Box>
                                {this.state.base64URL && 
                                <Flex flexDirection="column" alignItems="center">
                                    <Flex flexDirection="row" mx={5}>
                                        <Button
                                            onClick={this.addTextSection}
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
                                            mx="5px"
                                            px={3}
                                            mt={2}
                                            height="38px"
                                            width="fit-content">
                                            <Text color="white" fontSize="md">
                                                Add Caption Location
                                            </Text>                                  
                                        </Button>  
                                        <Button
                                            onClick={this.removeTextSection}
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
                                            mx="5px"
                                            px={3}
                                            mt={2}
                                            height="38px"
                                            width="fit-content">
                                            <Text color="white" fontSize="md">
                                                Remove Caption Location
                                            </Text>                                  
                                        </Button>  
                                    </Flex>
                                    <Input value={this.state.templateName} my={3} width={420} color="white" variant="outline" placeholder="Give your template a name" maxLength="60" onChange={(e) => this.changeTemplateName(e.currentTarget.value)} />
                                    <Button
                                        onClick={this.requestTemplate}
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
        );        
    }; 
}
