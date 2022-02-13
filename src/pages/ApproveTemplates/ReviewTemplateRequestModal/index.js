import React from 'react';
import { MinterAutoSizedText } from 'src/pages/MakeAMeme/MinterModal/MinterAutoSizedText';
import { MinterImage } from "src/components/common-ui/minter-image";
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
import { CheckCircleIcon } from "@chakra-ui/icons";

const axios = require('axios');

export default class ReviewTemplateRequestModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            borderStyle: {
                border: "solid 1px #ddd",
                borderStyle: "dashed",
                borderRadius: 10,
            },
            textLocations: this.props.template.textLocations,
            templateId: 1,
            memeWidth: this.props.template.width,
            memeHeight: this.props.template.height,
            templateName: this.props.template.templateName,
            loading: false,
            successful: false,
            src: this.props.template.src,
            requestedBy: this.props.template.requestedBy,
            requestId: this.props.template._id,
        };

        // get token
        if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            this.token = localStorage.getItem("token");
        }

        this.approveTemplate = this.approveTemplate.bind(this);
        this.rejectTemplate = this.rejectTemplate.bind(this);
        this.changeRotation = this.changeRotation.bind(this);
        this.changeSectionSize = this.changeSectionSize.bind(this);
        this.changeSectionLocation = this.changeSectionLocation.bind(this);
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

    async rejectTemplate() {
        this.setState(prevState => ({
            ...prevState,
            loading: true,
        }));
        var template = {
            src: this.state.src,
        };

        let localThis = this;
        // upload template to mongodb
        await axios.post('/api/admin/rejectTemplateRequest', {template: template, templateRequestId: this.state.requestId})
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

    async approveTemplate() {
        this.setState(prevState => ({
            ...prevState,
            loading: true,
        }));
        let correctTextLocations = [];
        this.state.textLocations.forEach((el) => {
            let textLocation = el;
            el.label = "";
            correctTextLocations.push(el)
        });
        var template = {
            src: this.state.src,
            width: this.state.memeWidth,
            height: this.state.memeHeight,
            textLocations: correctTextLocations,
            templateName: this.state.templateName,
            requestedBy: this.state.requestedBy,
        };

        let localThis = this;
        // upload template to mongodb
        await axios.post('/api/admin/approveTemplateRequest', {template: template, templateRequestId: this.state.requestId})
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
                        Approve Template Request
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
                                        <div
                                            style={{
                                                position: "relative", 
                                                top: 0, 
                                                left: 0, 
                                                width: this.state.memeWidth,
                                                height: `${this.state.memeHeight}px`,
                                            }}>
                                            <MinterImage
                                                src={this.state.src}
                                                height={this.state.memeHeight}
                                                width={this.state.memeWidth}
                                            />
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
                                        </div>
                                    </Flex>
                                </Box>
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
                                        onClick={this.rejectTemplate}
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
                                            Reject Request
                                        </Text>                                  
                                    </Button>  
                                    <Button
                                        onClick={this.approveTemplate}
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
                                            Approve Request
                                        </Text>                                  
                                    </Button>  
                                </Flex>
                            </Flex>}
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>  
        );        
    }; 
}
