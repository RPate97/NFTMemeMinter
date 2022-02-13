import {
    Box,
    Button,
    Flex,
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
    useDisclosure,
    Input
} from "@chakra-ui/react";
import { Link, ERC721TokenType } from '@imtbl/imx-sdk';
import { AppColors } from "styles/styles";
import { NFTMeme } from "src/utils/types";

type Props = {
    nftMeme: NFTMeme,
    tokenId: string
};

export const BurnNFTButton: React.FC<Props> = ({tokenId, nftMeme}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const link = new Link(process.env.NEXT_PUBLIC_LINK_ADDRESS);    
    const handleBurn = async () => {
        const transferResponsePayload = await link.transfer([
            {
              type: ERC721TokenType.ERC721,
              tokenId: tokenId,
              tokenAddress: process.env.NEXT_PUBLIC_DANKMINTER_COLLECTION_CONTRACT_ADDRESS,
              toAddress: '0x0000000000000000000000000000000000000000',
            },
        ]);
    }

    return (
        <>
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
                mr="5px"
                height="40px"
                p={0}
                onClick={onOpen}>
                <Text color="white" fontSize="md" p={4} m={0}>
                    Burn
                </Text>   
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent
                    background={AppColors.buttonBackground}
                    border="1px"
                    borderStyle="solid"
                    borderColor="gray.700"
                    borderRadius="3xl">
                    <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
                        Burn {nftMeme.name}
                    </ModalHeader>
                    <ModalCloseButton
                    color="white"
                    fontSize="sm"
                    _hover={{
                        color: "whiteAlpha.700",
                    }}
                    />
                    <ModalBody pt={0} px={4}>
                        <Text color="white" fontSize="md" p={4} m={0}>
                            Are you sure you want to do this?
                        </Text> 
                    </ModalBody>
                    <ModalFooter
                        justifyContent="center"
                        background="gray.900"
                        borderBottomLeftRadius="3xl"
                        borderBottomRightRadius="3xl">
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
                            mr="5px"
                            height="40px"
                            p={0}
                            onClick={handleBurn}>
                            <Text color="white" fontSize="md" p={4} m={0}>
                                Let It Burn
                            </Text>   
                        </Button>
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
                            mr="5px"
                            height="40px"
                            p={0}
                            onClick={onClose}>
                            <Text color="white" fontSize="md" p={4} m={0}>
                                Nevermind
                            </Text>   
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}