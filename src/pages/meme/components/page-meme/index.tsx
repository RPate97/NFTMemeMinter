import {
    Box,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Divider,
    Image,
} from "@chakra-ui/react";
import { DankEconomyMeme } from "src/utils/types";
import { AppColors } from "styles/styles";

type Props = {
    meme: DankEconomyMeme,
}

export const PageMeme: React.FC<Props> = ({meme}) => {
    const gatewayImage = meme.image.replace('ipfs://', process.env.NEXT_PUBLIC_IMAGE_GATEWAY);

    return (
        <Modal isOpen={true} onClose={() => {}} size="md">
            <ModalOverlay />
            <ModalContent
                background={AppColors.buttonBackground}
                border="1px"
                borderStyle="solid"
                borderColor="gray.700"
                borderRadius="3xl">
                <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
                    {meme.name}
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
                            <Image src={gatewayImage} alt={meme.name}/>
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
                                {meme.description}
                            </Text>
                            <Divider mt={3} mb={3} />
                            <Flex flexDirection="row" justifyContent="space-between" alignItems="start" mb={3}>
                                <Flex flexDirection="column" justifyContent="space-between" alignItems="start" mb={3}>
                                    <Text color="gray.400" fontSize="sm">
                                        Creator Name: {meme.creator}
                                    </Text>
                                    <Text color="gray.400" fontSize="sm">
                                        Creation Date: {(new Date(meme.creationDate)).toDateString()}
                                    </Text>
                                    <Text color="gray.400" fontSize="sm">
                                        Dankness Tier: {meme.dankness.toString()}
                                    </Text>
                                </Flex>
                                <Flex flexDirection="column" justifyContent="space-between" alignItems="start" mb={3}>
                                    <Text color="gray.400" fontSize="sm">
                                        Score: {meme.score.toString()}
                                    </Text>
                                    <Text color="gray.400" fontSize="sm">
                                        Print: #{meme.tokenId}
                                    </Text>
                                    <Text color="gray.400" fontSize="sm">
                                        Total Minted: {meme.quantity}
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
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
} 