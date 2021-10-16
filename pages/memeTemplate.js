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
            console.log(window.location);
            let search = window.location.search;
            let jsonState = decodeURIComponent(search).replace("?state=", "");
            console.log(jsonState);
            const state = JSON.parse(jsonState);
            console.log(state);
            this.state = state;
        }
    }

    render() {
        return (
            <div suppressHydrationWarning={true}>
                { process.browser && <Modal isOpen={true} onClose={() => {}} size="2xl" isCentered>
                    <ModalContent
                        alignContent="center"
                        borderStyle="solid"
                        bgGradient="linear-gradient(to right, #0f0c29, #302b63, #24243e)">
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
                                    width={605}
                                    height={this.state.memeHeight + 100}
                                    overflow="hidden"
                                    boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
                                >
                                    <Flex flexDirection="column" justifyContent="space-between" alignItems="center" mt={0} width={600}>
                                        <Flex flexDirection="row" mb={0} p={0} pt={1} justifyContent="space-between" width="100%">
                                            <Flex flexDirection="column" pl={2} pb={2} width={485} height={100} justifyContent="space-between">
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
                                                    {/* {"This is a boring meme that isn't funny but hey, at least it looks good:"} */}
                                                </Text>                                                   
                                            </Flex>
                                            <QRCode templateId={0} captions={this.state.hashCaptions} style={{marginRight: 5, width: 100, height: 100}}/>                           
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
                                                style={{position: "absolute", top: 0, left: 0, margin: 0, padding: 0}}
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
                            </Center>
                        </ModalBody>
                    </ModalContent>
                </Modal>}
            </div>
        );
    }
}
