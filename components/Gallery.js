
import React, { useState } from 'react'
import { GalleryMeme } from './GalleryMeme'
import TemplateMaker from './TemplateMaker'
import Modal from '@material-ui/core/Modal';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import MemeMinter from './MemeMinter';
import { styles } from '../styles/styles';
import Button from '@material-ui/core/Button';

const templates = [
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


export const Gallery = () => {
    const [mintMemeModalOpen, setMintMemeModalOpen] = useState(false);
    const [makeTemplateModalOpen, setMakeTemplateModalOpen] = useState(false);
    const [selectedMeme, setSelectedMeme] = useState();

    const handleOpenMintMeme = (index) => {
        setSelectedMeme(index);
        setMintMemeModalOpen(true);
    };
    
    const handleCloseMintMeme = () => {
        setSelectedMeme(null);
        setMintMemeModalOpen(false);
    };

    const handleOpenMakeTemplate = (index) => {
        setMakeTemplateModalOpen(true);
    };
    
    const handleCloseMakeTemplate = () => {
        setMakeTemplateModalOpen(false);
    };

    return (
        <div>
            <h1>Gallery</h1>
            <Button onClick={handleOpenMakeTemplate}>Create a new template</Button>
            <ImageList rowHeight={400} cols={3}>
                {templates.map((el, index) => (
                    <ImageListItem key={el.src} cols={el.cols || 1} onClick={() => handleOpenMintMeme(index)}>
                        <GalleryMeme meme={el} />    
                    </ImageListItem>
                ))}                     
            </ImageList>
            <Modal
                open={mintMemeModalOpen}
                onClose={handleCloseMintMeme}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div>
                    <MemeMinter meme={templates[selectedMeme]} />
                </div>
            </Modal>
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
        </div>
    )
}
