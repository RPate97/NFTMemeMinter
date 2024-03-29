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
    Center,
    Spacer,
    Input,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Divider,
    IconButton,
    Button,
    ModalBody,
} from "@chakra-ui/react";
import { RepeatIcon, MinusIcon } from "@chakra-ui/icons";
import { OptionButtons } from 'src/pages/MakeAMeme/FreeStyleModal/optionButtons';
import { LayoutSection } from 'src/pages/MakeAMeme/FreeStyleModal/layoutSection';
import QRCode from 'src/components/qrCode';
import { MinterAutoSizedText } from 'src/components/minter-auto-sized-text';

export default class MemeMinterTemplate extends React.Component { 

    constructor(props) {
        super(props);
        if (typeof window !== "undefined") {
            let search = window.location.search;
            let jsonState = decodeURIComponent(search).replace("?state=", "");
            this.state = JSON.parse(jsonState);
        }
    }

    fetchSectionRowHeight = (section) => {
        if (this.state.layout.layoutIdentifier === "FS") {
            const numRows = section.rowEnd - section.rowStart;
            let rowHeight = this.state.layoutHeight / this.state.layout.rows;
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
                    let rowHeight = this.state.layoutHeight / this.state.layout.rows;
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
                    let rowHeight = this.state.layoutHeight / this.state.layout.rows;
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

    render() {
        return (
            <div suppressHydrationWarning={true}>
                { process.browser && <Modal isOpen={true} onClose={() => {}} size="2xl" isCentered>
                    <ModalContent
                        alignContent="center"
                        borderStyle="solid"
                        backgroundImage="url('sand-background.jpg')"
                        backgroundSize="cover">
                            <Center>
                            <Box
                                    backgroundColor="#0e0e0e"
                                    borderRadius="3xl"
                                    border="3px"
                                    borderStyle="solid"
                                    borderColor="gray.600"
                                    px={0}
                                    pt={0}
                                    pb={0}
                                    mb={4}
                                    mt={4}
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
                            </Center>
                    </ModalContent>
                </Modal>}
            </div>
        );
    }
}
