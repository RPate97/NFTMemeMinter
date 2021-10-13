
import React, { useEffect } from 'react';
import { AccountModal } from "components/common-ui/wallet-bar/accountModal.js";
import { ConnectButton } from "components/common-ui/wallet-bar/connectButton"
import { useDisclosure } from "@chakra-ui/react";

export const WalletBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div>
            <ConnectButton handleOpenModal={onOpen} />
            <AccountModal isOpen={isOpen} onClose={onClose} />
        </div>
    )
}
