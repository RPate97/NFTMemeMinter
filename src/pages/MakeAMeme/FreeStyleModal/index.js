import React from 'react';
import { AppColors } from "styles/styles";
import {
    Box,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    Text,
    Grid,
    Input,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Divider,
    IconButton,
    Button,
    Spinner,
    Link,
    Spacer,
    Tooltip,
} from "@chakra-ui/react";
import {
    CheckIcon,
} from "@chakra-ui/icons";
import { RepeatIcon, MinusIcon } from "@chakra-ui/icons";
import { OptionButtons } from './optionButtons';
import { LayoutSection } from './layoutSection';
import QRCode from 'src/components/qrCode';
import { MinterAutoSizedText } from 'src/components/minter-auto-sized-text';
import { AutoSizeSticker } from './AutoSizeSticker';
import { MintingMeme } from './minting-meme';
const axios = require('axios');
export default class FreeStyleModal extends React.Component {
    constructor(props) {
        super(props);
        const layoutHeight = 500;
        const layoutWidth = 500;
        this.state = {
            borderStyle: {
                border: "solid 1px #ddd",
                borderStyle: "dashed",
                borderRadius: 10,
            },
            layoutBorderStyle: {
                color: "white",
                thickness: 5,
            },
            textLocations: [],
            stickerLocations: [],
            layout: props.layout,
            hashCaptions: [],
            mainCaption: "",
            memeName: "Why would I name my meme?",
            layoutWidth: layoutWidth,
            layoutHeight: layoutHeight,
            rowHeight: layoutHeight / props.layout.rows,
            columnWidth: layoutWidth / props.layout.columns,
            selectedOptions: 0,
            processing: {
                started: false,
                completed: false,
                loadingText: "Rendering meme...",
            }
        };

        // get token
        if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            this.token = localStorage.getItem("token");
            this.state.userProfile = JSON.parse(localStorage.getItem("userProfile"));
        }

        this.changeMemeName = this.changeMemeName.bind(this);
        this.changeMainCaption = this.changeMainCaption.bind(this);
        this.mintMeme = this.mintMeme.bind(this);
        this.setSelectedOption = this.setSelectedOption.bind(this);
        this.addLayoutImage = this.addLayoutImage.bind(this);
        this.removeLayoutImage = this.removeLayoutImage.bind(this);
        this.changeText = this.changeText.bind(this);
        this.addTextSection = this.addTextSection.bind(this);
        this.removeTextSection = this.removeTextSection.bind(this);
        this.changeRotation = this.changeRotation.bind(this);
        this.changeSectionSize = this.changeSectionSize.bind(this);
        this.changeSectionLocation = this.changeSectionLocation.bind(this);
        this.changeStickerSize = this.changeStickerSize.bind(this);
        this.changeStickerLocation = this.changeStickerLocation.bind(this);
        this.changeBorderStyle = this.changeBorderStyle.bind(this);

        this.updateLayoutHeight = this.fetchLayoutHeight.bind(this);
        this.updateGridRows = this.fetchGridRows.bind(this);
        this.fetchSectionRowHeight = this.fetchSectionRowHeight.bind(this);
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

    mintMeme = async () => {
        this.setState((prevState) => ({
            ...prevState,
            processing: {
                ...prevState.processing,
                started: true,
            }
        }));
        const nestedThis = this;
        setTimeout(() => {
            nestedThis.setState((prevState) => ({
                ...prevState,
                processing: {
                    ...prevState.processing,
                    loadingText: "Certifying dankness..."
                }
            }));
            axios.post('/api/requestMint', {name: this.state.memeName, state: this.state, token: this.token})
                .then(function (response) {
                    console.log(response);
                    setTimeout(() => {
                        nestedThis.setState((prevState) => ({
                            ...prevState,
                            metadata: response.data.metadata,
                            processing: {
                                ...prevState.processing,
                                loadingText: "Minting NFT...",
                                completed: true,
                            }
                        }));
                    }, 3000);
                })
                .catch(function (error) {
                    console.log(error);
                });
            setTimeout(() => {
                nestedThis.setState((prevState) => ({
                    ...prevState,
                    processing: {
                        ...prevState.processing,
                        loadingText: "Shitposting in the Discord..."
                    }
                }));
            }, 3000);
        }, 3000);
    };

    changeText = (newText, index) => {
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

    changeRotation = (newRotation, index) => {
        this.setState(prevState => ({
            ...prevState,
            textLocations: prevState.textLocations.map(el => el.key === index ? { ...el, rotation: newRotation } : el)
        }));
    }

    changeSectionSize = (newWidth, newHeight, index) => {
        /*eslint-disable */
        this.state.textLocations[index].height = newHeight; 
        this.state.textLocations[index].width = newWidth;
        /*eslint-enable */
    }

    changeSectionLocation = (newX, newY, index) => {
        const newTextLocations = this.state.textLocations;
        newTextLocations[index].x = newX;
        newTextLocations[index].y = newY;
        this.setState(prevState => ({
            ...prevState,
            textLocations: newTextLocations
        }));

        /*eslint-disable */
        // this.state.textLocations[index].x = newX;
        // this.state.textLocations[index].y = newY;
        /*eslint-enable */
    }

    setSelectedOption = (selectedOptions) => {
        this.setState(prevState => ({
            ...prevState,
            selectedOptions: selectedOptions,
        }));
    }

    fetchSectionRowHeight = (section) => {
        if (this.state.layout.layoutIdentifier === "FS") {
            const numRows = section.rowEnd - section.rowStart;
            let rowHeight = this.state.layoutHeight / this.props.layout.rows;
            if (section.imageHeight) {
                rowHeight = section.imageHeight / numRows;
            }
            return rowHeight;
        } else {
            return this.state.rowHeight;
        }
    }

    fetchLayoutHeight = () => {
        if (this.state.layout.layoutIdentifier === "FS") {
            let row = 0;
            let layoutHeight = 0;
            this.state.layout.layoutSections.forEach((section) => {
                if (row <= section.rowStart) {
                    const numRows = section.rowEnd - section.rowStart;
                    let rowHeight = this.state.layoutHeight / this.props.layout.rows;
                    if (section.imageHeight) {
                        rowHeight = section.imageHeight / numRows;
                    }
                    layoutHeight += (rowHeight * numRows);
                    row = section.rowEnd;
                }
            });
            return layoutHeight;
        } else {
            return this.state.layoutHeight;
        } 
    }

    fetchGridRows = () => {
        if (this.state.layout.layoutIdentifier === "FS") {
            let row = 0;
            let rowStr = '';
            this.state.layout.layoutSections.forEach((section) => {
                if (row <= section.rowStart) {
                    const numRows = section.rowEnd - section.rowStart;
                    let rowHeight = this.state.layoutHeight / this.props.layout.rows;
                    if (section.imageHeight) {
                        rowHeight = section.imageHeight / numRows;
                    }
                    rowStr += `repeat(${numRows}, ${rowHeight}px) `;
                    row = section.rowEnd;
                }
            });
            return rowStr;            
        } else {
            return `repeat(${this.state.layout.rows}, ${this.state.rowHeight}px)`;
        }
    }

    addLayoutImage = (index, newSrc, newId, imageWidth, imageHeight) => {
        let newLayoutSections = this.state.layout.layoutSections;
        newLayoutSections[index].src = newSrc;
        newLayoutSections[index].uniqueId = newId;
        newLayoutSections[index].imageWidth = imageWidth;
        newLayoutSections[index].imageHeight = imageHeight;
        this.setState(prevState => ({
            ...prevState,
            layout: {
                ...prevState.layout,
                layoutSections: newLayoutSections,
            }
        }));
    }

    removeLayoutImage = (index) => {
        let newLayoutSections = this.state.layout.layoutSections;
        delete newLayoutSections[index].src;
        delete newLayoutSections[index].uniqueId;
        delete newLayoutSections[index].imageWidth;
        delete newLayoutSections[index].imageHeight;
        this.setState(prevState => ({
            ...prevState,
            layout: {
                ...prevState.layout,
                layoutSections: newLayoutSections,
            }
        }));
    }

    addTextSection = () => {
        var newKey = this.state.textLocations.length;
        var x = this.state.layoutWidth / 2 - 100;
        var y = this.state.layoutHeight / 2 - 100;
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

    removeTextSection = (index) => {
        var newSections = this.state.textLocations;
        newSections.splice(index, 1);
        this.setState(prevState => ({
            ...prevState,
            textLocations: newSections,
        }));
    }

    addStickerLocation = (sticker) => {
        let newKey = this.state.stickerLocations.length;
        let x = this.state.layoutWidth / 2 - 100 + this.state.textLocations.length * 20;
        let y = this.state.layoutHeight / 2 - 100 + this.state.textLocations.length * 20;
        let newStickerLocation = sticker;
        newStickerLocation.x = x;
        newStickerLocation.y = y;
        newStickerLocation.key = newKey;
        newStickerLocation.width = 60;
        newStickerLocation.height = 60;
        newStickerLocation.rotation = 0;
        this.setState(prevState => ({
            ...prevState,
            stickerLocations: [
                ...prevState.stickerLocations,
                newStickerLocation,
            ]
        }));
    }

    removeStickerLocation = (index) => {
        let newStickerLocations = this.state.stickerLocations;
        newStickerLocations.splice(index, 1);
        this.setState(prevState => ({
            ...prevState,
            stickerLocations: newStickerLocations,
        }));
    }

    changeStickerSize = (newWidth, newHeight, index) => {
        /*eslint-disable */
        this.state.stickerLocations[index].height = newHeight; 
        this.state.stickerLocations[index].width = newWidth;
        /*eslint-enable */
    }

    changeStickerLocation = (newX, newY, index) => {
        /*eslint-disable */
        this.state.stickerLocations[index].x = newX;
        this.state.stickerLocations[index].y = newY;
        /*eslint-enable */
    }

    changeBorderStyle = (newColor, newThickness) => {
        this.setState(prevState => ({
            ...prevState,
            layoutBorderStyle: {
                color: newColor,
                thickness: newThickness
            }
        }));
    }

    render() {
        const { isOpen, onClose } = this.props;
        return (
            <Modal isOpen={isOpen} onClose={onClose} size="full">
                <ModalOverlay />
                <ModalContent
                    background={AppColors.buttonBackground}
                    backgroundSize="cover"
                    border="1px"
                    borderStyle="solid"
                    borderColor="gray.700"
                    alignContent="center"
                    padding={5}
                    height={this.state.processing.started === true ? "100%" : undefined}>
                    <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
                        <Text ml={5} color="white" fontSize="md" style={{
                            color: "#ffffff",
                            fontFamily: "SpaceMono-Regular",
                            fontSize: 24,
                        }}>
                            Freestyle
                        </Text> 
                    </ModalHeader>
                    <ModalCloseButton
                        color="white"
                        fontSize="sm"
                        _hover={{
                            color: "whiteAlpha.700",
                        }}
                    />
                    {!this.state.processing.started 
                    ? <Flex flexDirection="column" alignItems="start">
                        <Flex flexDirection="row" alignItems="start">
                            <Flex flexDirection="column" alignItems="center">
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
                                    width={this.state.layoutWidth + 5}
                                    height={this.fetchLayoutHeight() + 150}
                                    overflow="hidden"
                                    boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
                                    position="relative"
                                >
                                    <Flex flexDirection="column" justifyContent="space-between" alignItems="center" mt={0} width={this.state.layoutWidth}>
                                        <Flex flexDirection="row" mb={0} p={0} pt={0} justifyContent="space-between" width="100%">
                                            <Flex flexDirection="column" pl={2} pb={1} pt={1} width={this.state.layoutWidth - 150} height={150} justifyContent="space-between">
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
                                        <Grid 
                                            m={0} 
                                            p={0}
                                            templateColumns={`repeat(${this.state.layout.columns}, ${this.state.columnWidth}px)`} 
                                            templateRows={this.fetchGridRows()}
                                            gap="0">
                                            {this.state.layout.layoutSections.map((el, index) => {
                                                return (
                                                    <LayoutSection 
                                                        key={el.key} 
                                                        el={el} 
                                                        layout={this.state.layout} 
                                                        addLayoutImage={this.addLayoutImage} 
                                                        removeLayoutImage={this.removeLayoutImage} 
                                                        layoutIndex={index} 
                                                        rowWidth={this.fetchSectionRowHeight(el)} 
                                                        colWidth={this.state.columnWidth}
                                                        layoutBorderColor={this.state.layoutBorderStyle.color}
                                                        layoutBorderThickness={this.state.layoutBorderStyle.thickness}
                                                        token={this.token}
                                                    />
                                                )
                                            })}
                                        </Grid>
                                    </Flex>
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
                                            zIndex={5}
                                        />                            
                                    ))}
                                    {/* {this.state.stickerLocations.map((el, index) => (
                                        <AutoSizeSticker 
                                            borderStyle={this.state.borderStyle}
                                            sticker={el} 
                                            rotation={el.rotation} 
                                            height={el.height} 
                                            width={el.width} 
                                            x={el.x}
                                            y={el.y}
                                            id={el.key}
                                            key={el.key}
                                            changeStickerLocation={this.changeStickerLocation}
                                            changeStickerSize={this.changeStickerSize}
                                            zIndex={5}
                                        />                            
                                    ))} */}
                                </Box>
                                <OptionButtons addTextSection={this.addTextSection} addStickerLocation={this.addStickerLocation} setSelectedOption={this.setSelectedOption} selectedOptions={this.state.selectedOptions} changeBorderStyle={this.changeBorderStyle} />   
                            </Flex>
                            <Flex flexDirection="column" justifyContent="center" alignItems="center" mb={0} mt={0} p={0} ml={4} width={550} minHeight={this.state.memeHeight + 150}>
                                <Input width={500} color="white" variant="outline" placeholder="Top Caption" maxLength="60" onChange={(e) => this.changeMainCaption(e.currentTarget.value)} />
                                <Input mt={5} width={500} color="white" variant="outline" placeholder="Name your NFT (optional)" maxLength="60" onChange={(e) => this.changeMemeName(e.currentTarget.value)} />                     
                                {this.state.textLocations.map((el, index) => (
                                    <Flex key={el.toString() + index.toString()} flexDirection="column" mt={4}>
                                        <Flex flexDirection="row" width={500}>
                                            <Input color="white" variant="outline" placeholder="Image Caption" onChange={(e) => this.changeText(e.currentTarget.value, index)} />
                                            <IconButton
                                                ml={3}
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
                                                onClick={() => {this.removeTextSection(index)}}
                                                icon={<MinusIcon />}
                                            />
                                        </Flex>
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
                                                    <RepeatIcon w={4} h={4} />
                                                </SliderThumb>
                                            </Slider>
                                        </Flex>
                                        <Divider mt={3} />
                                    </Flex>
                                ))}  
                            </Flex>
                        </Flex>
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
                            ml={0}
                            onClick={() => {
                                this.mintMeme()
                            }}>
                            Mint
                        </Button>
                    </Flex> 
                    : 
                    <Box height="100%">
                        {!this.state.processing.completed 
                        ? <Flex flexDir="column" alignItems="center" height="100%">
                            <Spacer />
                            <Spinner color="white" size="xl" />
                            <Text mt={5} color="white" fontSize="md" style={{
                                color: "#ffffff",
                                fontFamily: "SpaceMono-Regular",
                                fontSize: 24,
                            }}>
                                {this.state.processing.loadingText}
                            </Text> 
                            <Spacer />
                        </Flex> 
                        : <MintingMeme nftMetaData={this.state.metadata} />}
                    </Box>}
                </ModalContent>
            </Modal>  
        )        
    }; 
}
