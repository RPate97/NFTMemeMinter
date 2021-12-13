
import React, { useEffect } from 'react';
import { AccountModal } from "components/common-ui/wallet-bar/accountModal.js";
import { ButtonBar } from "components/common-ui/wallet-bar/buttonBar"
import { useDisclosure } from "@chakra-ui/react";

export const WalletBar = ({account, deactivate, userProfile}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div>
            <ButtonBar handleOpenModal={onOpen} account={account} userProfile={userProfile} />
            <AccountModal isOpen={isOpen} onClose={onClose} account={account} deactivate={deactivate} />
        </div>
    )
}
