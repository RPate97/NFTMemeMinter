// AccountModal.tsx
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
  } from "@chakra-ui/react";
  import { AppColors } from "styles/styles";
import { SacrificeButton } from "src/pages/home/collection/sacrifice";
import { TipCreatorButton } from "src/pages/home/collection/tipCreator";
import { VoteButton } from "src/pages/home/collection/vote";
import { useTokenBalance } from '@usedapp/core';
import { MarketOrder, NFTMeme } from "src/utils/types";
import { BuyButton } from "./buy-button";
import { ethers } from 'ethers';
import { AxiosPromise, AxiosRequestConfig } from "axios";
import { RefetchOptions } from "axios-hooks";

type Props = {
    isOpen: boolean,
    onClose: () => void,
    nftMeme: NFTMeme,
    order: MarketOrder,
    refetchListings: (config?: AxiosRequestConfig<any>, options?: RefetchOptions) => AxiosPromise<any>,
    addMemeToCollection: (boughtMeme: NFTMeme) => void,
}

export const MarketMemeModal: React.FC<Props> = ({isOpen, onClose, nftMeme, order, refetchListings, addMemeToCollection}) => {
    const gatewayImage = nftMeme.image_url.replace('ipfs://', process.env.NEXT_PUBLIC_IMAGE_GATEWAY);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay />
            <ModalContent
                background={AppColors.buttonBackground}
                border="1px"
                borderStyle="solid"
                borderColor="gray.700"
                borderRadius="3xl">
                <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
                    {nftMeme.name}
                </ModalHeader>
                <ModalCloseButton
                color="white"
                fontSize="sm"
                _hover={{
                    color: "whiteAlpha.700",
                }}
                />
                <ModalBody pt={0} px={4}>
                    <Flex flexDirection="column">
                        <Box borderRadius="xl" overflow="hidden">
                            <Image src={gatewayImage} alt={nftMeme.name}/>
                        </Box>
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
                                {nftMeme.description}
                            </Text>
                            <Divider mt={3} mb={3} />
                            <Flex flexDirection="row" justifyContent="space-between" alignItems="start" mb={3}>
                                <Flex flexDirection="column" justifyContent="space-between" alignItems="start" mb={3}>
                                    <Text color="gray.400" fontSize="sm">
                                        Creator Name: {nftMeme.metadata.creator}
                                    </Text>
                                    <Text color="gray.400" fontSize="sm">
                                        Creation Date: {(new Date(nftMeme.created_at)).toDateString()}
                                    </Text>
                                    <Text color="gray.400" fontSize="sm">
                                        Dankness Tier: {nftMeme.metadata.dankness.toString()}
                                    </Text>
                                </Flex>
                                <Flex flexDirection="column" justifyContent="space-between" alignItems="start" mb={3}>
                                    <Text color="gray.400" fontSize="sm">
                                        Score: {nftMeme.metadata.score.toString()}
                                    </Text>
                                    <Text color="gray.400" fontSize="sm">
                                        Print: #{nftMeme.metadata.tokenId}
                                    </Text>
                                    <Text color="gray.400" fontSize="sm">
                                        Total Minted: 1
                                    </Text>
                                </Flex>                                
                            </Flex>
                        </Box>                        
                    </Flex>
                </ModalBody>

                <ModalFooter
                    justifyContent="end"
                    background="gray.900"
                    borderBottomLeftRadius="3xl"
                    borderBottomRightRadius="3xl">
                    <BuyButton 
                        order={order} 
                        refetchListings={refetchListings} 
                        addMemeToCollection={addMemeToCollection} 
                        nftMeme={nftMeme}
                    />
                    <Spacer />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );

}