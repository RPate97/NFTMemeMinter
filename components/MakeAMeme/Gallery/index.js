
import React, { useState } from 'react'
import { GalleryMeme } from './GalleryMeme'
import TemplateMaker from '../../TemplateMaker'
import { useEthers } from "@usedapp/core";
import Modal from '@material-ui/core/Modal';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import { styles } from '../../../styles/styles';
import Button from '@material-ui/core/Button';
import { WalletBar } from 'components/common-ui/wallet-bar'
import {
    Box,
} from "@chakra-ui/react";

const templates = [
    {
        src: '/images/umbrellaAcademy.jpeg',
        width: 680,
        height: 680,
    },
    {
        src: '/images/boy.png',
        width: 610,
        height: 915,
    },
    {
        src: '/images/crying.png',
        width: 610,
        height: 406,
    },
    {
        src: '/images/dank.png',
        width: 610,
        height: 610,
    },
    {
        src: '/images/devilgirl.jpg',
        width: 2048,
        height: 1536,
    },
    {
        src: '/images/dog.png',
        width: 610,
        height: 610,
    },
    {
        src: '/images/doubt.png',
        width: 610,
        height: 349,
    },
    {
        src: '/images/frust.png',
        width: 500,
        height: 451,
    },
    {
        src: '/images/fry.jpg',
        width: 552,
        height: 414,
    },
    {
        src: '/images/image.png',
        width: 610,
        height: 457,
    },
    {
        src: '/images/jobs.jpg',
        width: 500,
        height: 375,
    },
    {
        src: '/images/ned.jpeg',
        width: 1280,
        height: 800,
    },
    {
        src: '/images/oldie.png',
        width: 640,
        height: 480,
    },
    {
        src: '/images/one-does-not.jpg',
        width: 545,
        height: 321,
    },
    {
        src: '/images/penguin.png',
        width: 610,
        height: 610,
    },
    {
        src: '/images/phone.jpg',
        width: 615,
        height: 409,
    },
    {
        src: '/images/sad.png',
        width: 610,
        height: 636,
    },
    {
        src: '/images/sponge.png',
        width: 500,
        height: 333,
    },
    {
        src: '/images/trump.jpg',
        width: 2319,
        height: 1546,
    },
    {
        src: '/images/vict-baby.png',
        width: 926,
        height: 616,
    },
    {
        src: '/images/web.png',
        width: 610,
        height: 388,
    },
    {
        src: '/images/wolf.png',
        width: 610,
        height: 457,
    },
]


export const Gallery = ({account, deactivate}) => {
    const [makeTemplateModalOpen, setMakeTemplateModalOpen] = useState(false);
    const handleOpenMakeTemplate = (index) => {
        setMakeTemplateModalOpen(true);
    };
    
    const handleCloseMakeTemplate = () => {
        setMakeTemplateModalOpen(false);
    };

    let userProfile;
    if (typeof window !== 'undefined') {
        userProfile = JSON.parse(localStorage.getItem("userProfile"));
    }

    return (
        <div>  
            <main style={styles.main}>
                <WalletBar account={account} deactivate={deactivate} />
                <Button variant="outlined" style={{color: "white", borderColor: "white", marginRight: "auto", marginBottom: 10, marginLeft: 10}} onClick={handleOpenMakeTemplate}>Create a new template</Button>
                {/* <ImageList rowHeight={500} cols={3}>
                    {userProfile && templates && templates.map((el, index) => (
                        <ImageListItem key={el.src} cols={el.cols || 1}>
                            <GalleryMeme meme={el} userAddress={account} userProfile={userProfile} />    
                        </ImageListItem>
                    ))}                     
                </ImageList> */}
                <Box
                    padding={2}
                    w="100%"
                    mx="auto"
                    sx={{ columnCount: [1, 2, 3, 4], columnGap: "8px" }}
                >
                    {userProfile && templates && templates.map((el, index) => (
                        <GalleryMeme key={el.src} meme={el} userAddress={account} userProfile={userProfile} />  
                    ))}  
                </Box>
                <Modal
                    open={makeTemplateModalOpen}
                    onClose={handleCloseMakeTemplate}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div>
                        <TemplateMaker />
                    </div>
                </Modal>
            </main>
        </div>
    )
}
