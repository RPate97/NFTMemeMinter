
import React, { useState, useEffect } from 'react'
import { GalleryMeme } from './GalleryMeme'
import TemplateMakerModal from 'components/template-maker'
import { useEthers } from "@usedapp/core";
import Modal from '@material-ui/core/Modal';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import { styles } from '../../../styles/styles';
import { WalletBar } from 'components/common-ui/wallet-bar'
import {
    Box,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import useAxios from 'axios-hooks';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export const Gallery = ({account, deactivate}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [page, setPage] = useState(1)
    const [{ data, loading, error }] = useAxios({
      url: '/api/fetchTemplates',
      params: { page },
    })

    useEffect(() => {
        if (!loading) {
            console.log(data);
        }
    }, [loading, data]);

    let userProfile;
    if (typeof window !== 'undefined') {
        userProfile = JSON.parse(localStorage.getItem("userProfile"));
    }

    return (
        <div>  
            <main style={styles.main}>
                <WalletBar account={account} deactivate={deactivate} />
                <Button 
                    variant="outlined" 
                    color="white"
                    marginRight="auto"
                    marginBottom={10}
                    marginLeft={10}
                    onClick={onOpen}>
                    Request A Template
                </Button>
                <Box
                    padding={2}
                    w="100%"
                    mx="auto"
                    sx={{ columnCount: [1, 2, 3, 4], columnGap: "8px" }}
                >
                    {userProfile && data && data.templates.map((el, index) => (
                        <GalleryMeme key={el._id} template={el} userAddress={account} userProfile={userProfile} />  
                    ))}  
                </Box>
                <TemplateMakerModal isOpen={isOpen} onClose={onClose}/>
            </main>
        </div>
    )
}
