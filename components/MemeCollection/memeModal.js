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
  } from "@chakra-ui/react";
  import { AppColors } from "styles/styles";
import { SacrificeButton } from "components/MemeCollection/sacrifice"
import { TipCreatorButton } from "components/MemeCollection/tipCreator"
import { VoteButton } from "components/MemeCollection/vote"
import { useTokenBalance } from '@usedapp/core'


export const MemeModal = ({userAddress, contract, isOpen, onClose, hash, score, postings, memeId, imageURI, name, description, creatorName, printNum, creationDate, totalMinted}) => {
    let treeFiddyBalance = useTokenBalance(process.env.NEXT_PUBLIC_TREE_FIDDY_ADDRESS, userAddress);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
            <ModalOverlay />
            <ModalContent
                background={AppColors.buttonBackground}
                border="1px"
                borderStyle="solid"
                borderColor="gray.700"
                borderRadius="3xl">
                <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
                    {name}
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
                            <img width={600} height={600} src={imageURI} alt={name}/>
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
                            <Flex flexDirection="row" justifyContent="space-between" alignItems="start" mb={3}>
                                <Flex flexDirection="column" justifyContent="space-between" alignItems="start" mb={3}>
                                    <Text color="gray.400" fontSize="sm">
                                        Creator Name: {creatorName}
                                    </Text>
                                    <Text color="gray.400" fontSize="sm">
                                        Creation Date: {(new Date(creationDate)).toDateString()}
                                    </Text>
                                    <Text color="gray.400" fontSize="sm">
                                        Around the Web: {postings}
                                    </Text>
                                </Flex>
                                <Flex flexDirection="column" justifyContent="space-between" alignItems="start" mb={3}>
                                    <Text color="gray.400" fontSize="sm">
                                        Score: {score.toString()}
                                    </Text>
                                    <Text color="gray.400" fontSize="sm">
                                        Print: #{printNum}
                                    </Text>
                                    <Text color="gray.400" fontSize="sm">
                                        Total Minted: {totalMinted}
                                    </Text>
                                </Flex>                                
                            </Flex>

                            <Text color="gray.400" fontSize="sm">
                                Description: {description}
                            </Text>
                        </Box>                        
                    </Flex>
                </ModalBody>

                <ModalFooter
                justifyContent="end"
                background="gray.900"
                borderBottomLeftRadius="3xl"
                borderBottomRightRadius="3xl"
                m>
                    <TipCreatorButton treeFiddyBalance={treeFiddyBalance} memeId={memeId}/>
                    <SacrificeButton treeFiddyBalance={treeFiddyBalance} memeId={memeId}/>
                    <Spacer />
                    <VoteButton memeId={memeId} upDown={false} />
                    <VoteButton memeId={memeId} upDown={true} />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );

}