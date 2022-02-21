import React from 'react'
import { AppColors } from "styles/styles";
import {
    Box,
    Button,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Tab,
    Tabs,
    TabList,
    TabPanel,
    TabPanels,
  } from "@chakra-ui/react";
import { AuthenticateSection } from './authenticateSection';
import { ProfileInfoSection } from './profileInfoSection';
import { ImmutableXAuthSection } from './immutableXAuthSection';


export const AuthModal = ({authenticate, nonce, isOpen, onClose, tabIndex, linkAccount, updateProfile}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent
                background={AppColors.buttonBackground}
                border="1px"
                borderStyle="solid"
                borderColor="gray.700"
                borderRadius="3xl">
                <ModalCloseButton
                color="white"
                fontSize="sm"
                _hover={{
                    color: "whiteAlpha.700",
                }}
                />
                <Tabs index={tabIndex}>
                    <TabList>
                        <Tab>
                            <Text color="white" fontSize="lg">
                                Link Wallet
                            </Text>
                        </Tab>
                        <Tab>
                            <Text color="white" fontSize="lg">
                                Link ImmutableX
                            </Text>
                        </Tab>
                        <Tab>
                            <Text color="white" fontSize="lg">
                                Set Creator Handle
                            </Text>
                        </Tab>
                    </TabList>
                    <TabPanels p="2rem">
                        <TabPanel>
                            <AuthenticateSection authenticate={authenticate} nonce={nonce}/>
                        </TabPanel>
                        <TabPanel>
                            <ImmutableXAuthSection link={linkAccount} />
                        </TabPanel>
                        <TabPanel>
                            <ProfileInfoSection updateProfile={updateProfile}/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </ModalContent>
        </Modal>
    );
}