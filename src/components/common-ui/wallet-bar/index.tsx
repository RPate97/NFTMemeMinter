
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { ButtonBar } from "src/components/common-ui/wallet-bar/buttonBar"
import { useDisclosure, Flex, Spacer, Button, Text } from "@chakra-ui/react";
import { Logo } from "src/components/common-ui/logo";
import { Link } from '@imtbl/imx-sdk';
import { UserProfile } from 'src/utils/types';
import { AuthModal } from "components/common-ui/authModal";
import { AppColors } from "styles/styles";

import Web3 from 'web3';
const axios = require('axios');

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
    getUserProfile: (userToken: string) => Promise<UserProfile | null>,
}

export const WalletBar: React.FC<Props> = ({activateBrowserWallet, account, doneConnecting, deactivate, setDoneConnecting, token, setToken, userProfile, setUserProfile, getUserProfile}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [authTabIndex, setAuthTabIndex] = useState(0);
    const [ nonce, setNonce ] = useState();
    const [ starkPublicKey, setStarkPublicKey ] = useState<string>();

    function handleConnectWallet() {
        activateBrowserWallet();
    }

    useEffect(() => {
        async function setAccountNonce() {
            if (account) {
                const res = await axios.post('/api/fetchUserNonce', {address: account});
                setNonce(res.data.nonce);
                const cookieAddress = localStorage.getItem('WALLET_ADDRESS');
                if (cookieAddress?.toLowerCase() !== account?.toLowerCase() || !token) {
                    onOpen();
                }
            }            
        }
        setAccountNonce();
    }, [account, onOpen]);

    // testing authentication
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    async function authenticate() {
        const res = await axios.post('/api/fetchUserNonce', {address: account});
        const nonce = res.data.nonce;
        var hex = '';
        for(var i=0; i<nonce.length; i++) { 
            hex += ''+nonce.charCodeAt(i).toString(16);
        }
        const data = `0x${hex}`;  
        // @ts-ignore
        web3.currentProvider.sendAsync({
            id: 1,
            method: 'personal_sign',
            params: [account, data]
        },
        async function(err, result) {
            console.log("signed now getting profile");
            let sig = result.result;
            const res = await axios.post('/api/authenticate', {sig: sig, address: account});
            const user = await getUserProfile(res.data.token);
            console.log(res);
            console.log(user);
            localStorage.setItem("token", res.data.token);
            setToken(res.data.token);
            setAuthTabIndex(1);                       
        });
    }

    async function linkAccount() {
        const link = new Link(process.env.NEXT_PUBLIC_LINK_ADDRESS);
        const { address, starkPublicKey } = await link.setup({});
        setStarkPublicKey(starkPublicKey);
        localStorage.setItem('WALLET_ADDRESS', address);
        localStorage.setItem('STARK_PUBLIC_KEY', starkPublicKey);
        if (userProfile && userProfile.handle) { 
            onClose();
            setDoneConnecting(true);
            setAuthTabIndex(0);
        } else {
            setAuthTabIndex(2);                       
        }
    }

    async function updateProfile(handle) {
        const res = await axios.post('/api/createProfile', {token: token, handle: handle, memeIndex: 0, starkPublicKey: starkPublicKey }); 
        setUserProfile({token: token, handle: handle, memeIndex: 0, starkPublicKey: starkPublicKey } as unknown as UserProfile);
        onClose();
        setDoneConnecting(true);
    }

    return (
        <div style={{position: "sticky", top: 0, zIndex: 10}}>
            <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                backgroundColor="blackAlpha.900"
                pb={1}>
                <Logo />
                <Spacer />
                {account && doneConnecting && token && userProfile 
                ? <ButtonBar account={account} userProfile={userProfile} deactivate={deactivate} />
                : <Button
                    bg="transparent"
                    border="1px solid transparent"
                    _hover={{
                        border: "1px",
                        borderStyle: "solid",
                        borderColor: "white",
                    }}
                    backgroundColor="gray.700"
                    borderColor="gray.700"
                    borderRadius="xl"
                    m="0px"
                    mr={4}
                    height="40px"
                    onClick={handleConnectWallet}
                    px={4}>
                    <Text color="white" fontSize="md" fontWeight="bold">
                        Connect Wallet
                    </Text>
                </Button>}
            </Flex>
            {isOpen && <AuthModal nonce={nonce} authenticate={authenticate} onClose={onClose} isOpen={isOpen} tabIndex={authTabIndex} updateProfile={updateProfile} linkAccount={linkAccount} />}
        </div>
    )
}
