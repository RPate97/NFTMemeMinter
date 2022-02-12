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
import { SacrificeButton } from "src/components/MemeCollection/sacrifice";
import { TipCreatorButton } from "src/components/MemeCollection/tipCreator";
import { VoteButton } from "src/components/MemeCollection/vote";
import { useTokenBalance } from '@usedapp/core';
import { MarketOrder, NFTMeme } from "src/utils/types";
import { BuyButton } from "./buy-button";

type Props = {
    isOpen: boolean,
    onClose: () => void,
    nftMeme: NFTMeme,
    order: MarketOrder,
}

export const MarketMemeModal: React.FC<Props> = ({isOpen, onClose, nftMeme, order}) => {
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
                            <Text color="gray.400" fontSize="sm">
                                Dankness Tier: {nftMeme.metadata.dankness.toString()}
                            </Text>
                        </Box>                        
                    </Flex>
                </ModalBody>

                <ModalFooter
                    justifyContent="end"
                    background="gray.900"
                    borderBottomLeftRadius="3xl"
                    borderBottomRightRadius="3xl">
                    <BuyButton order={order} />
                    <Spacer />
                    <VoteButton memeId={nftMeme.token_id} upDown={false} />
                    <Text color="gray.400" fontSize="md" fontWeight="bold" ml={1} textAlign="center">
                        {nftMeme.metadata.score.toString()}
                    </Text>
                    <VoteButton memeId={nftMeme.token_id} upDown={true} />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );

}