import { Header } from 'src/components/common-ui/header';
import { ConnectWalletButton } from 'src/components/common-ui/connect-wallet-button/index.js';
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
    getUserProfile: (userToken: string) => Promise<void>,
}

export const DefaultPage: React.FC<Props> = (props) => {
    const {
        account, 
        activateBrowserWallet, 
        deactivate, 
        doneConnecting, 
        setDoneConnecting, 
        token, 
        setToken, 
        userProfile, 
        setUserProfile, 
        getUserProfile
    } = props;

    console.log(getUserProfile);
    return (
        <Flex 
            flexDirection="column"
            backgroundImage="linear-gradient(to top, #09203f 0%, #537895 100%)"
            backgroundSize="cover"
            backgroundAttachment="fixed"
            height="100vh"
        >
            <Header title="DankMinter"/>
            {account && doneConnecting && token && userProfile ?
                <> 
                    <WalletBar account={account} deactivate={deactivate} userProfile={userProfile} />
                    {props.children}
                </>
            : <ConnectWalletButton 
                activateBrowserWallet={activateBrowserWallet} 
                account={account} 
                setDoneConnecting={setDoneConnecting} 
                token={token} 
                setToken={setToken} 
                userProfile={userProfile} 
                setUserProfile={setUserProfile} 
                getUserProfile={getUserProfile}/>}
        </Flex>
    )
}
