import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import Slider from '@material-ui/core/Slider';
import { MinterAutoSizedText } from './MinterAutoSizedText';
import QRCode from '../../qrCode';
import * as htmlToImage from 'html-to-image';
import { MinterImage } from "components/MakeAMeme/MinterModal/MinterImage";
import { AppColors } from "styles/styles";
import { FirstMint } from "components/MakeAMeme/MinterModal/FirstMintModal";
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
    Tab,
    Tabs,
    TabList,
    TabPanel,
    TabPanels,
    Center,
  } from "@chakra-ui/react";
const axios = require('axios');

export class MemeMinterModal extends React.Component {
    constructor(props) {
        super(props);
        var memeHeight = (600 / (this.props.meme.width / this.props.meme.height));
        this.state = {
            borderStyle: {
                border: "solid 1px #ddd",
                borderStyle: "dashed",
                borderRadius: 10,
            },
            textLocations: [
                {
                    x: (600 - 400) / 2,
                    y: (600 / (this.props.meme.width / this.props.meme.height)) / 20,
                    text: "Caption 1",
                    rotation: 0,
                    height: 60,
                    width: 400,
                    key: 0,
                },
                {
                    x: (600 - 400) / 2,
                    y: (600 / (this.props.meme.width / this.props.meme.height)) - (600 / (this.props.meme.width / this.props.meme.height)) / 6.5,
                    text: "Caption 2",
                    rotation: 0,
                    height: 60,
                    width: 400,
                    key: 1,
                }
            ],
            templateUrl: this.props.meme.src,
            memeWidth: 600,
            memeHeight: memeHeight,
            memeURL: "https://www.google.com",
            hashCaptions: ["Caption 1", "Caption 2"],
            tabIndex: 0,
            mintToAddress: props.userAddress,
        };

        this.svgRef = React.createRef();
        this.mintMeme = this.mintMeme.bind(this);
        this.updateBorderStyle = this.updateBorderStyle.bind(this);
    }

    getBase64Image(imgUrl, callback) {
        var img = new Image();    
        img.onload = function(){
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL("image/png");
            callback(dataURL); // the base64 string
        }
        img.src = imgUrl;
    }

    componentDidMount = () => {
        // var img = new Image();    
        // img.onload = () => {
        //     var canvas = document.createElement("canvas");
        //     canvas.width = img.width;
        //     canvas.height = img.height;
        //     var ctx = canvas.getContext("2d");
        //     ctx.drawImage(img, 0, 0);
        //     var dataURL = canvas.toDataURL("image/png");
        //     this.setState(prevState => ({
        //         ...prevState,
        //         base64URL: dataURL,
        //     }));            
        // }
        // img.src = this.props.meme.src;
    }

    componentDidUpdate() {
        const currentComponent = this;
        if (this.state.borderStyle.border !== "solid 1px #ddd") {
            var node = document.getElementById('svg_ref');
            htmlToImage.toPng(node)
                .then(async function (dataUrl) {
                    // const a = document.createElement("a");
                    // console.log(dataUrl); // send this in a post to the server
                    // a.download = "meme.png";
                    // a.href = dataUrl;
                    // document.body.appendChild(a);
                    // currentComponent.saveImage();
                    // a.click();
                    currentComponent.mintMeme(dataUrl);
                    currentComponent.updateBorderStyle({border: "solid 1px #ddd", borderStyle: "dashed", borderRadius: 10});
                    // currentComponent.setState(prevState => ({
                    //     ...prevState,
                    //     tabIndex: 1,
                    // }));
                })
                .catch(function (error) {
                    console.error('oops, something went wrong!', error);
                });            
        }
    }

    // saveImage = async () => {
    //     const res = await axios.post('/api/renderImage', {state: this.state});
    // }

    mintMeme = async (base64Meme) => {
        console.log("minting...");
        let captions = [];
        this.state.textLocations.forEach((el) => {
            captions.push(el.text);
        });
        const res = await axios.post('/api/mintMeme', {captions: captions, templateId: 1, name: "test.jpeg", description: "a description", state: this.state, mintToAddress: this.state.mintToAddress});
    };

    updateBorderStyle = (newBorderStyleObject) => {
        console.log("set state");
        this.setState(prevState => ({
            ...prevState,
            borderStyle: newBorderStyleObject,
        }));
    }

    changeText(newText, index) {
        let captions = [];
        for (let i = 0; i < this.state.textLocations.length; i++) {
            if (i == index) {
                captions.push(newText);
            } else {
                captions.push(this.state.textLocations.text);
            }
        }
        console.log(captions);
        this.setState(prevState => ({
            ...prevState,
            textLocations: prevState.textLocations.map(el => el.key === index ? { ...el, text: newText } : el),
            hashCaptions: captions,
        }));
    }

    changeRotation(newRotation, index) {
        this.setState(prevState => ({
            ...prevState,
            textLocations: prevState.textLocations.map(el => el.key === index ? { ...el, rotation: newRotation } : el)
        }));
    }

    changeSectionSize = (newWidth, newHeight, index) => {
        this.state.textLocations[index].height = newHeight;
        this.state.textLocations[index].width = newWidth;
    }

    changeSectionLocation = (newX, newY, index) => {
        this.state.textLocations[index].x = newX;
        this.state.textLocations[index].y = newY;
    }
    
    changeTab = (index) => {
        console.log("change tab: " + index);
        this.setState(prevState => ({
            ...prevState,
            tabIndex: index,
        }));
    }

    render() {
        const { isOpen, onClose } = this.props;
        return (
            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalOverlay />
                <ModalContent
                    background={AppColors.buttonBackground}
                    border="1px"
                    borderStyle="solid"
                    borderColor="gray.700"
                    alignContent="center"
                    bgGradient="linear-gradient(to right, #0f0c29, #302b63, #24243e)"
                    borderRadius="3xl">
                    <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
                        Template Name Goes Here
                    </ModalHeader>
                    <ModalCloseButton
                        color="white"
                        fontSize="sm"
                        _hover={{
                            color: "whiteAlpha.700",
                        }}
                    />
                    <Tabs index={this.state.tabIndex}>
                        <TabList>
                            <Tab>Create</Tab>
                            <Tab>Mint</Tab>
                            <Tab>Complete</Tab>
                        </TabList>
                        <TabPanels p="2rem">
                            <TabPanel>
                            <ModalBody pt={0} m={0} alignContent="center">
                                <Center>
                                    <Flex flexDirection="column">
                                        <Box
                                            backgroundColor="#0e0e0e"
                                            borderRadius="3xl"
                                            border="3px"
                                            borderStyle="solid"
                                            borderColor="gray.600"
                                            px={0}
                                            pt={0}
                                            pb={0}
                                            mb={7}
                                            mt={9}
                                            width={605}
                                            height={this.state.memeHeight + 210}
                                            overflow="hidden"
                                            boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
                                        >
                                            <Flex flexDirection="column" justifyContent="space-between" alignItems="center" mt={0} width={600}>
                                                <Flex flexDirection="row" mb={0} p={0} pt={1} justifyContent="space-between" width="100%">
                                                    <Flex flexDirection="column" pl={2} pb={2} width={385} height={200} justifyContent="space-between">
                                                        <Text color="white" fontSize="md" style={{
                                                            color: "#ffffff",
                                                            fontFamily: "SpaceMono-Regular",
                                                            fontSize: 16,
                                                        }}>
                                                            Created by: @pate - DankMinter.com
                                                        </Text>   
                                                        <Text color="white" fontSize="md" style={{
                                                            color: "#ffffff",
                                                            fontFamily: "SpaceMono-Regular",
                                                            fontSize: 16,
                                                        }}>
                                                            {"This is a boring meme that isn't funny but hey, at least it looks good:"}
                                                        </Text>                                                   
                                                    </Flex>
                                                    <QRCode handle={"yourHandleHere"} memeIndex={0} style={{marginRight: 5, width: 200, height: 200}}/>                           
                                                </Flex>
                                                <div
                                                    id="svg_ref"
                                                    style={{
                                                        position: "relative", 
                                                        top: 0, 
                                                        left: 0, 
                                                        width: 600,
                                                        height: `${this.state.memeHeight}px`,
                                                    }}>
                                                    <MinterImage
                                                        style={{position: "absolute", top: 0, left: 0, margin: 0}}
                                                        src={this.state.templateUrl}
                                                        height={this.state.memeHeight}
                                                        width={600}
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
                                        <Flex flexDirection="column" justifyContent="space-between" alignItems="center" mb={3} pl={5} pr={5}>
                                            {this.state.textLocations.map((el, index) => (
                                                <FormGroup key={el.key}>
                                                    <Label style={{color: "#fff"}} for={"toptext" + el.key}>Caption: {el.key + 1}</Label>
                                                    <input className="form-control" type="text" name={"toptext" + el.key} id={"toptext" + el.key} placeholder="Add a caption" onChange={(e) => this.changeText(e.currentTarget.value, index)} />
                                                    <Slider style={{width: 200, marginLeft: 20, transform: "translate(0, 35%)"}} value={el.rotation} onChange={(e, val) => this.changeRotation(val, el.key)} aria-labelledby="continuous-slider" min={-180} max={180} />
                                                </FormGroup>                        
                                            ))}
                                            <Button
                                                onClick={() => this.updateBorderStyle({border: "solid 0px #ddd"})}
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
                                                mt={3}
                                                height="38px">
                                                <Text color="white" fontSize="md">
                                                    Mint it!
                                                </Text>                                  
                                            </Button>                              
                                        </Flex>
                                    </Flex>
                                </Center>
                            </ModalBody>
                                {/* <ModalBody pt={0} px={4}>
                                    <Box
                                        borderRadius="3xl"
                                        border="1px"
                                        borderStyle="solid"
                                        borderColor="gray.600"
                                        px={5}
                                        pt={4}
                                        pb={2}
                                        mb={3}
                                    >
                                        <Flex flexDirection="column" justifyContent="space-between" alignItems="center" mb={3} pl={5} pr={5}>
                                            <Flex flexDirection="row" justifyContent="start" alignItems="center" mb={0} pl={5} pr={5}>
                                                <Text color="white" fontSize="md" mr="auto">
                                                    Mint it!
                                                </Text>     
                                                <QRCode templateId={0} captions={this.state.hashCaptions} />                           
                                            </Flex>
                                            <div
                                                id="svg_ref"
                                                style={{
                                                    backgroundColor: "black", 
                                                    position: "relative", 
                                                    top: 0, 
                                                    left: 0, 
                                                    width: 600,
                                                    height: `${this.state.memeHeight}px`,
                                                }}>
                                                <MinterImage
                                                    style={{position: "absolute", top: 0, left: 0, zIndex: 1, margin: 0}}
                                                    src={this.state.templateUrl}
                                                    height={600 / (meme.width / meme.height)}
                                                    width={600}
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
                                    <Flex flexDirection="column" justifyContent="space-between" alignItems="center" mb={3} pl={5} pr={5}>
                                        {this.state.textLocations.map((el, index) => (
                                            <FormGroup key={el.key}>
                                                <Label style={{color: "#fff"}} for={"toptext" + el.key}>Caption: {el.key + 1}</Label>
                                                <input className="form-control" type="text" name={"toptext" + el.key} id={"toptext" + el.key} placeholder="Add a caption" onChange={(e) => this.changeText(e.currentTarget.value, index)} />
                                                <Slider style={{width: 200, marginLeft: 20, transform: "translate(0, 35%)"}} value={el.rotation} onChange={(e, val) => this.changeRotation(val, el.key)} aria-labelledby="continuous-slider" min={-180} max={180} />
                                            </FormGroup>                        
                                        ))}
                                        <Button
                                            onClick={() => this.updateBorderStyle({border: "solid 0px #ddd"})}
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
                                            mt={3}
                                            height="38px">
                                            <Text color="white" fontSize="md">
                                                Mint it!
                                            </Text>                                  
                                        </Button>                              
                                    </Flex>
                                </ModalBody> */}
                            </TabPanel>
                            <TabPanel>
                                <FirstMint changeTab={this.changeTab} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ModalContent>
            </Modal>  
        )        
    }; 
}
