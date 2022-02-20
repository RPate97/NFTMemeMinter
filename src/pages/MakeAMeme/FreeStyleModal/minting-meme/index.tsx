import {
    Box,
    Button,
    Flex,
    Link,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Spacer,
    Progress,
    Divider,
    Image,
    Spinner,
} from "@chakra-ui/react";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";
import { AppColors } from "styles/styles";
import { VoteButton } from "src/components/MemeCollection/vote";
import { NFTMeme, NFTMemeMetadata, UserProfile } from "src/utils/types";
import { SellButton } from "src/components/MemeCollection/sell";
import useAxios from 'axios-hooks';
import { CancelSale } from "src/components/MemeCollection/cancel-sale";
import { BurnNFTButton } from "src/components/MemeCollection//burn";
import { useEffect, useRef, useState } from "react";

type Props = {
    nftMetaData: NFTMemeMetadata,
}

export const MintingMeme: React.FC<Props> = ({nftMetaData}) => {
    const [copied, setCopied] = useState(false);
    const boxRef = useRef(null);
  
    const copyToClipboard = () => {
        if (copied === false) {
            navigator.clipboard.writeText(nftMetaData.image)
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 5000);            
        }
    };  

    return (
        <Flex flexDirection="row">
            <Box borderRadius="xl" overflow="hidden" width="40%">
                <Image src={nftMetaData.image} alt={nftMetaData.name}/>
            </Box>
            <Flex flexDir="column" alignItems="center" justifyItem="center" height="100%" width="60%" ml={5} mr={5}>
                <Text mt={5} color="white" fontSize="md" style={{
                    color: "#ffffff",
                    fontFamily: "SpaceMono-Regular",
                    fontSize: 24,
                }}>
                    {"Mint in progress, you're NFT will be airdropped to your wallet in literally 60 seconds!"}
                </Text> 
                <Box
                    borderRadius="3xl"
                    border="1px"
                    borderStyle="solid"
                    borderColor="gray.600"
                    px={5}
                    pt={4}
                    pb={2}
                    mb={3}
                    mt={3}
                >
                    <Text color="gray.400" fontSize="sm">
                        {nftMetaData.description}
                    </Text>
                    <Divider mt={3} mb={3} />
                    <Flex flexDirection="row" justifyContent="space-between" alignItems="start" mb={3}>
                        <Flex flexDirection="column" justifyContent="space-between" alignItems="start" mb={3}>
                            <Text color="gray.400" fontSize="sm">
                                Creator Name: {nftMetaData.creator}
                            </Text>
                            <Text color="gray.400" fontSize="sm">
                                Creation Date: {(new Date(nftMetaData.creationDate)).toDateString()}
                            </Text>
                            <Text color="gray.400" fontSize="sm">
                                Dankness Tier: {nftMetaData.dankness.toString()}
                            </Text>
                        </Flex>
                        <Flex flexDirection="column" justifyContent="space-between" alignItems="start" mb={3}>
                            <Text color="gray.400" fontSize="sm">
                                Score: {nftMetaData.score.toString()}
                            </Text>
                        </Flex>                                
                    </Flex> 
                </Box>    
                <Spacer />
                <Flex flexDirection="row" width="100%">
                    <Button
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
                        mr={5}
                        px={0}
                        width="70%"
                        height="fit-content"
                        minHeight="90px"
                        onClick={copyToClipboard}
                        style={{
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                        }}>
                        <Flex flexDirection="row" alignItems="center" height="100%">
                            <Text color="white" fontSize="md" py={0} px={5} m={0} wordBreak="break-word">
                                {nftMetaData.image}
                            </Text>  
                            {!copied 
                            ? <CopyIcon width={7} height={7} color="white" mr={2}/>
                            : <CheckIcon width={7} height={7} color="green.700" mr={2} />}
                        </Flex>
                    </Button>     
                    <Flex flexDirection="column" width="30%" height="100%">
                        <Box px="0" borderRadius="xl" mb={1}>
                            <Button
                                bg="transparent"
                                border="1px solid transparent"
                                _hover={{
                                    border: "1px",
                                    borderStyle: "solid",
                                    borderColor: "white",
                                    backgroundColor: "gray.700",
                                }}
                                borderRadius="xl"
                                m="0px"
                                mr="5px"
                                px={0}
                                height="40px"
                                width="100%">
                                <Link href='/' passHref borderRadius="xl" color="transparent">
                                    <Text color="white" fontSize="md" py={2} px={3} m={0}>
                                        View In Collection
                                    </Text>                                      
                                </Link>
                            </Button>  
                        </Box> 
                        <Spacer />
                        <Button
                            bg="green.700"
                            border="1px solid transparent"
                            _hover={{
                                border: "1px",
                                borderStyle: "solid",
                                borderColor: "white",
                                backgroundColor: "green.800",
                            }}
                            borderRadius="xl"
                            m="0px"
                            mr="5px"
                            px={0}
                            height="40px"
                            width="100%"
                            mt={1}>
                            <Text color="white" fontSize="md" py={2} px={3} m={0}>
                                Share
                            </Text>                                      
                        </Button>                       
                    </Flex>                               
                </Flex>
            </Flex>                   
        </Flex>
    );
}