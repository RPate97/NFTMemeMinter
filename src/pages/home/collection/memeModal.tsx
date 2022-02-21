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
import { AppColors } from "styles/styles";
import { NFTMeme, UserProfile } from "src/utils/types";
import { SellButton } from "./sell";
import useAxios from 'axios-hooks';
import { CancelSale } from "./cancel-sale";
import { BurnNFTButton } from "./burn";
import { useEffect } from "react";

type Props = {
    isOpen: boolean,
    onClose: () => void,
    nftMeme: NFTMeme,
    userProfile: UserProfile
}

export const MemeModal: React.FC<Props> = ({isOpen, onClose, nftMeme, userProfile}) => {
    const gatewayImage = nftMeme.image_url.replace('ipfs://', process.env.NEXT_PUBLIC_IMAGE_GATEWAY);

    const [{ data, loading, error }, refetch] = useAxios({
        url: `${process.env.NEXT_PUBLIC_API_URL}/orders?page_size=1&user=0xC6f9519F8e2C2be0bB29A585A894912Ccea62Dc8&status=active&sell_token_id=1&sell_token_address=0xaB67F62376dA415337F4eaaBD28f0b264b7dA15A`,
        params: { 
          page_size: 1,
          user: userProfile.address,
          status: "active",
          sell_token_id: nftMeme.token_id,
          sell_token_address: process.env.NEXT_PUBLIC_DANKMINTER_COLLECTION_CONTRACT_ADDRESS,
         },
    });

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
                    justifyContent="start"
                    background="gray.900"
                    borderBottomLeftRadius="3xl"
                    borderBottomRightRadius="3xl">
                    { data && data.result[0] 
                    ? <CancelSale order={data.result[0]} refetch={refetch} />
                    : <Flex flexDirection="row" width="100%" justifyContent="space-between"> 
                        <SellButton nftMeme={nftMeme} refetch={refetch} /> 
                        <BurnNFTButton tokenId={nftMeme.token_id} nftMeme={nftMeme} />
                        </Flex>}    
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}