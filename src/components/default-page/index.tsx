import { Header } from 'src/components/common-ui/header';
import { WalletBar } from 'src/components/common-ui/wallet-bar';
import React, { Dispatch, SetStateAction } from 'react';
import { UserProfile } from 'src/utils/types';
import { Flex } from "@chakra-ui/react";

type Props = {
    account: string,
    activateBrowserWallet: () => void,
    deactivate: () => void,
    doneConnecting: boolean,
    setDoneConnecting: Dispatch<SetStateAction<boolean>>,
    token: string,
    setToken: Dispatch<SetStateAction<string>>,
    userProfile: UserProfile,
    setUserProfile: Dispatch<SetStateAction<UserProfile | null>>,
    getUserProfile: (userToken: string) => Promise<UserProfile>,
}

export const DefaultPage: React.FC<Props> = (props) => {
    return (
        <Flex 
            flexDirection="column"
            backgroundColor="black"
            height="100%"
            width="100%"
        >
            <Header title="DankMinter"/> 
            <WalletBar {...props} />
            {props.children}
        </Flex>
    )
}
