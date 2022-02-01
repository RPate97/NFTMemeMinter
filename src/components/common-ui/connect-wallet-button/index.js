import React, { useEffect, useState } from 'react';
import { Flex, Text, Button, Spacer } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { AuthModal } from "src/components/common-ui/connect-wallet-button/authModal";
import { styles } from 'styles/styles.js'
import { ImmutableXClient, Link } from '@imtbl/imx-sdk';

import Web3 from 'web3';
const axios = require('axios');

export const ConnectWalletButton = ({activateBrowserWallet, account, setDoneConnecting, token, setToken, userProfile, setUserProfile, getUserProfile}) => {
    const [authTabIndex, setAuthTabIndex] = useState(0);
    const [ nonce, setNonce ] = useState();
    const [ starkPublicKey, setStarkPublicKey ] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();

    function handleConnectWallet() {
        activateBrowserWallet();
    }

    useEffect(() => {
        async function setAccountNonce() {
            if (account) {
                const res = await axios.post('/api/fetchUserNonce', {address: account});
                setNonce(res.data.nonce);
                onOpen();
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
        web3.currentProvider.sendAsync({
            id: 1,
            method: 'personal_sign',
            params: [account, data]
        },
        async function(err, result) {
            let sig = result.result;
            const res = await axios.post('/api/authenticate', {sig: sig, address: account});
            const user = await getUserProfile(res.data.token);
            localStorage.setItem("token", res.data.token);
            setToken(res.data.token);
            if (user && user.starkPublicKey) {
                if (user && user.handle) {
                    onClose();
                    setDoneConnecting(true);
                } else {
                    // move to next tab
                    setAuthTabIndex(2);                       
                }
            } else {
                setAuthTabIndex(1);
            }
        });
    }

    async function linkAccount() {
        const link = new Link(process.env.NEXT_PUBLIC_LINK_ADDRESS);
        const { address, starkPublicKey } = await link.setup({});
        setStarkPublicKey(starkPublicKey);
        setAuthTabIndex(2);
    }

    async function updateProfile(handle) {
        const res = await axios.post('/api/createProfile', {token: token, handle: handle, memeIndex: 0, starkPublicKey: starkPublicKey }); 
        setUserProfile({token: token, handle: handle, memeIndex: 0, starkPublicKey: starkPublicKey });
        onClose();
        setDoneConnecting(true);
    }

    return (
        <div style={{position: "sticky", top: 0}}>
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                alignContent="center"
                h="100vh">
                <Spacer />
                <h1 style={styles.walletBar.logo}>
                    Welcome to DankMinter          
                </h1>
                <h4 style={styles.walletBar.presentedBy}>
                    By Dank Labs
                </h4>   
                <Text color="white" maxWidth={700} textAlign="center" fontSize={20} mt={3}>
                    The meme generator that mints unique NFTs of your memes.
                </Text>
                <Text color="white" maxWidth={700} textAlign="center">
                    Own your work, capture the value you create, collect truly one of a kind NFT memes.
                </Text>
                <Button mt={10} onClick={handleConnectWallet}> Connect MetaMask Wallet </Button>
                <Text color="white" maxWidth={700} textAlign="center" mt={10}>
                    {"Don't have MetaMask?"}
                </Text>
                <Button mt={1} onClick={handleConnectWallet}> Install MetaMask </Button>
                <Spacer />
                <Text color="white" textAlign="center">
                    {"We cannot guarentee alternative wallets will work correctly. Improved wallet support is in our roadmap. If you have a specific wallet you would like to see, please let us know in the Discord! Thank your for your patience."}
                </Text>
            </Flex>   
            <AuthModal nonce={nonce} authenticate={authenticate} onClose={onClose} isOpen={isOpen} tabIndex={authTabIndex} updateProfile={updateProfile} linkAccount={linkAccount} />
        </div>
    );
}