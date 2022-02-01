import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { MinterAutoSizedText } from 'src/components/minter-auto-sized-text';
import QRCode from '../../qrCode';
import * as htmlToImage from 'html-to-image';
import { MinterImage } from "src/components/common-ui/minter-image";
import { AppColors } from "styles/styles";
import { FirstMint } from "src/components/MakeAMeme/MinterModal (out of date)/FirstMintModal";
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
    Input,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Spacer,
    Divider,
  } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

const axios = require('axios');

export class MemeMinterModal extends React.Component {
    constructor(props) {
        super(props);
        var memeWidth = props.template.width;
        var memeHeight = props.template.height;
        let hashCaptions = [];
        props.template.textLocations.forEach(() => {
            hashCaptions.push("");
        });
        this.state = {
            borderStyle: {
                border: "solid 1px #ddd",
                borderStyle: "dashed",
                borderRadius: 10,
            },
            textLocations: props.template.textLocations,
            templateId: props.template._id,
            templateUrl: props.template.src,
            memeWidth: props.template.width,
            memeHeight: props.template.height,
            memeURL: "https://www.google.com",
            hashCaptions: hashCaptions,
            tabIndex: 0,
            mintToAddress: this.props.userAddress,
            userProfile: this.props.userProfile,
            mainCaption: "",
            memeName: "Why would I name my meme?",
        };

        // get token
        if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            this.token = localStorage.getItem("token");
        } else {
            // Sorry! No Web Storage support..
            return null;
        }

        this.templateName = this.props.template.templateName;

        this.mintMeme = this.mintMeme.bind(this);
        this.updateBorderStyle = this.updateBorderStyle.bind(this);
    }

    changeMemeName = (newMemeName) => {
        this.setState(prevState => ({
            ...prevState,
            memeName: newMemeName,
        }));
    }

    changeMainCaption = (newMainCaption) => {
        this.setState(prevState => ({
            ...prevState,
            mainCaption: newMainCaption,
        }));
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

    componentDidUpdate() {
        const currentComponent = this;
        if (this.state.borderStyle.border !== "solid 1px #ddd") {
            var node = document.getElementById('svg_ref');
            htmlToImage.toPng(node)
                .then(async function (dataUrl) {
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

    mintMeme = async (base64Meme) => {
        const res = await axios.post('/api/requestMint', {name: this.state.memeName, state: this.state, token: this.token});
        console.log(res);
    };

    updateBorderStyle = (newBorderStyleObject) => {
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
    
    changeTab = (index) => {
        this.setState(prevState => ({
            ...prevState,
            tabIndex: index,
        }));
    }

    render() {
        const { isOpen, onClose } = this.props;
        return (
            <Modal isOpen={isOpen} onClose={onClose} size="6xl">
                <ModalOverlay />
                <ModalContent
                    background={AppColors.buttonBackground}
                    // backgroundImage="url('sand-background.jpg')"
                    backgroundSize="cover"
                    // backgroundAttachment: "fixed",
                    border="1px"
                    borderStyle="solid"
                    borderColor="gray.700"
                    alignContent="center"
                    // bgGradient="linear-gradient(to right, #0f0c29, #302b63, #24243e)"
                    borderRadius="3xl">
                    <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
                        <Text ml={5} color="white" fontSize="md" style={{
                            color: "#ffffff",
                            fontFamily: "SpaceMono-Regular",
                            fontSize: 24,
                        }}>
                            {this.templateName}
                        </Text> 
                    </ModalHeader>
                    <ModalCloseButton
                        color="white"
                        fontSize="sm"
                        _hover={{
                            color: "whiteAlpha.700",
                        }}
                    />
                    <Tabs index={this.state.tabIndex}>
                        {/* <TabList>
                            <Tab>Create</Tab>
                            <Tab>Mint</Tab>
                            <Tab>Complete</Tab>
                        </TabList> */}
                        <TabPanels p={0} pb={1}>
                            <TabPanel>
                                <ModalBody p={0} m={0} alignContent="center">
                                    <Center>
                                        <Flex flexDirection="column" alignItems="center">
                                            <Flex flexDirection="row" alignItems="center">
                                                <Box
                                                    backgroundColor="#0e0e0e"
                                                    borderRadius="3xl"
                                                    border="3px"
                                                    borderStyle="solid"
                                                    borderColor="gray.600"
                                                    px={0}
                                                    pt={0}
                                                    pb={0}
                                                    mb={0}
                                                    mt={0}
                                                    width={this.state.memeWidth + 5}
                                                    height={this.state.memeHeight + 150}
                                                    overflow="hidden"
                                                    boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
                                                >
                                                    <Flex flexDirection="column" justifyContent="space-between" alignItems="center" mt={0} width={this.state.memeWidth}>
                                                        <Flex flexDirection="row" mb={0} p={0} pt={0} justifyContent="space-between" width="100%">
                                                            <Flex flexDirection="column" pl={2} pb={1} pt={1} width={this.state.memeWidth - 150} height={150} justifyContent="space-between">
                                                                <Text color="white" fontSize="md" style={{
                                                                    color: "#ffffff",
                                                                    fontFamily: "SpaceMono-Regular",
                                                                    fontSize: 16,
                                                                }}>
                                                                    Creator: {this.state.userProfile?.handle} - DankMinter.com
                                                                </Text>   
                                                                <Text color="white" fontSize="md" style={{
                                                                    color: "#ffffff",
                                                                    fontFamily: "SpaceMono-Regular",
                                                                    fontSize: 24,
                                                                }}>
                                                                    {this.state.mainCaption}
                                                                </Text>                                                   
                                                            </Flex>
                                                            <QRCode handle={this.state.userProfile?.handle} memeIndex={this.state.userProfile?.memeIndex} width={150} height={150} style={{marginRight: 0, width: 150, height: 150}}/>                           
                                                        </Flex>
                                                        <div
                                                            id="svg_ref"
                                                            style={{
                                                                position: "relative", 
                                                                top: 0, 
                                                                left: 0, 
                                                                width: this.state.memeWidth,
                                                                height: `${this.state.memeHeight}px`,
                                                            }}>
                                                            <MinterImage
                                                                src={this.state.templateUrl}
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
                                                <Flex flexDirection="column" justifyContent="center" alignItems="center" mb={0} mt={0} p={0} ml={4} width={550} minHeight={this.state.memeHeight + 150}>
                                                    <Box
                                                        backgroundColor="rgba(14, 14, 14, 0.7)"
                                                        borderRadius="3xl"
                                                        border="3px"
                                                        borderStyle="solid"
                                                        borderColor="gray.600"
                                                        px={1}
                                                        pt={0}
                                                        pb={1}
                                                        mb={5}
                                                        mt={0}
                                                        overflow="hidden"
                                                        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
                                                        height="fit-content"
                                                    >
                                                        <Text textAlign="center" width={500} color="white" fontSize="md" mr={2} style={{
                                                            fontFamily: "SpaceMono-Regular",
                                                            fontSize: 20,
                                                        }}>
                                                            About DankMinter
                                                        </Text> 
                                                        <Text textAlign="center" width={500} color="white" fontSize="md" mr={2} mt={2} style={{
                                                            fontFamily: "SpaceMono-Regular",
                                                            fontSize: 14,
                                                        }}>
                                                            {"DankMinter works just like a normal meme generator so go wild! When you're done, click 'Mint!' to submit for minting."}
                                                        </Text> 
                                                        <Text textAlign="center" width={500} color="white" fontSize="md" mr={2} mt={2} style={{
                                                            fontFamily: "SpaceMono-Regular",
                                                            fontSize: 14,
                                                        }}>
                                                            {"We will only mint your meme if it is unique so be creative! If your meme is not unique, we'll let you know."}
                                                        </Text> 
                                                        <Text textAlign="center" width={500} color="white" fontSize="md" mr={2} mt={2} style={{
                                                            fontFamily: "SpaceMono-Regular",
                                                            fontSize: 14,
                                                        }}>
                                                            {"Your NFT will be delivered directly to your wallet after we finish processing it. This should take only a few minutes, but may take longer when DankMinter is being used heavily."}
                                                        </Text> 
                                                        <Text textAlign="center" width={500} color="white" fontSize="md" mr={2} mt={2} style={{
                                                            fontFamily: "SpaceMono-Regular",
                                                            fontSize: 14,
                                                        }}>
                                                            {"TreeFiddies are the native cryptocurrency of DankMinter and can be used mint memes, tip meme creators, and perform sacrifices to your memes 😈"}
                                                        </Text> 
                                                        <Text textAlign="center" width={500} color="white" fontSize="md" mr={2} mt={2} style={{
                                                            fontFamily: "SpaceMono-Regular",
                                                            fontSize: 14,
                                                        }}>
                                                            {"You can earn TreeFiddies by voting for the dankest memes on the 'Vote' page. If you need more TreeFiddies, you can always swap for them using QuickSwap.exchange."}
                                                        </Text>   
                                                        <Text textAlign="center" width={500} color="white" fontSize="md" mr={2} mt={2} style={{
                                                            fontFamily: "SpaceMono-Regular",
                                                            fontSize: 14,
                                                        }}>
                                                            {"DankMinter NFTs can transfered and sold just like any other ERC721 NFT. You can view your NFTs in the 'Collection' page. The best place to sell and trade them is https://www.opensea.io"}
                                                        </Text> 
                                                    </Box>
                                                    <Spacer />
                                                    <Input width={500} color="white" variant="outline" placeholder="Top Caption" maxLength="60" onChange={(e) => this.changeMainCaption(e.currentTarget.value)} />
                                                    {this.state.textLocations.map((el, index) => (
                                                        <Flex key={el.toString() + index.toString()} flexDirection="column" mt={4}>
                                                            <Input width={500} color="white" variant="outline" placeholder="Image Caption" onChange={(e) => this.changeText(e.currentTarget.value, index)} />
                                                            <Flex flexDirection="row" mt={1}>
                                                                <Text color="white" fontSize="md" mr={2} style={{
                                                                    fontFamily: "SpaceMono-Regular",
                                                                    fontSize: 16,
                                                                }}>
                                                                    Rotate
                                                                </Text> 
                                                                <Slider aria-label="slider-ex-4" mt={1} defaultValue={0} width={200} min={-180} max={180} onChange={(val) => this.changeRotation(val, el.key)}>
                                                                    <SliderTrack bg="blue.100">
                                                                        <SliderFilledTrack bg="blue" />
                                                                    </SliderTrack>
                                                                    <SliderThumb boxSize={6}>
                                                                        {/* <Box color="tomato" as={MdGraphicEq} /> */}
                                                                        <RepeatIcon w={4} h={4} />
                                                                    </SliderThumb>
                                                                </Slider>
                                                            </Flex>
                                                            <Divider mt={3} />
                                                        </Flex>
                                                    ))}  
                                                    <Input mt={5} width={500} color="white" variant="outline" placeholder="Name your NFT (optional)" maxLength="60" onChange={(e) => this.changeMemeName(e.currentTarget.value)} />                     
                                                </Flex>
                                            </Flex>
                                            <Text color="white" fontSize="md" mt={5}>
                                                Price: 35 TreeFiddies*
                                            </Text> 
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
                                                mt={2}
                                                height="38px"
                                                width="fit-content">
                                                <Text color="white" fontSize="md">
                                                    Mint!
                                                </Text>                                  
                                            </Button>  
                                            <Text color="white" fontSize="md" width={500} textAlign="center" mt={3}>
                                                *The first time you mint a meme it will cost no TreeFiddies, and will received 175 to get you started :) TreeFiddies are like an in game currency for DankMinter.
                                            </Text> 
                                        </Flex>
                                    </Center>
                                </ModalBody>
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
