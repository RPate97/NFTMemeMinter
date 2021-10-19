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
import { AddTokenSection } from './addTokenSection';
import { ProfileInfoSection } from './profileInfoSection';


export const AuthModal = ({authenticate, nonce, isOpen, onClose, tabIndex, addTokens, updateProfile}) => {
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
                        <Tab>Sign In</Tab>
                        <Tab>Add Tokens</Tab>
                        <Tab>Set Handle</Tab>
                    </TabList>
                    <TabPanels p="2rem">
                        <TabPanel>
                            <AuthenticateSection authenticate={authenticate} nonce={nonce}/>
                        </TabPanel>
                        <TabPanel>
                            <AddTokenSection addTokens={addTokens}/>
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