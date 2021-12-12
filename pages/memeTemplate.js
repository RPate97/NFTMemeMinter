import React from 'react';
import { MinterAutoSizedText } from 'components/MakeAMeme/MinterModal/MinterAutoSizedText';
import QRCode from 'components/qrCode';
import { MinterImage } from "components/MakeAMeme/MinterModal/MinterImage";
import { AppColors } from "styles/styles";
import {
    Box,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Text,
    Center,
    Spacer,
} from "@chakra-ui/react";

export default class MemeMinterTemplate extends React.Component { 

    constructor(props) {
        super(props);
        if (typeof window !== "undefined") {
            let search = window.location.search;
            let jsonState = decodeURIComponent(search).replace("?state=", "");
            this.state = JSON.parse(jsonState);
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
                        <ModalBody pt={0} m={0} alignContent="center">
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
                                mb={7}
                                mt={9}
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
                                            style={{position: "absolute", top: 0, left: 0, margin: 0}}
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
                            </Center>
                        </ModalBody>
                    </ModalContent>
                </Modal>}
            </div>
        );
    }
}
