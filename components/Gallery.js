
import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import { GalleryMeme } from './GalleryMeme'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import { MemeMinter } from './MemeMinter';
import { styles } from '../styles/styles';

const templates = [
    {
        src: '/images/boy.png',
        numTextSpaces: 1,
        width: 610,
        height: 915,
    },
    {
        src: '/images/crying.png',
        numTextSpaces: 1,
        width: 610,
        height: 406,
    },
    {
        src: '/images/dank.png',
        numTextSpaces: 1,
        width: 610,
        height: 610,
    },
    {
        src: '/images/devilgirl.jpg',
        numTextSpaces: 1,
        width: 2048,
        height: 1536,
    },
    {
        src: '/images/dog.png',
        numTextSpaces: 1,
        width: 610,
        height: 610,
    },
    {
        src: '/images/doubt.png',
        numTextSpaces: 1,
        width: 610,
        height: 349,
    },
    {
        src: '/images/frust.png',
        numTextSpaces: 1,
        width: 500,
        height: 451,
    },
    {
        src: '/images/fry.jpg',
        numTextSpaces: 1,
        width: 552,
        height: 414,
    },
    {
        src: '/images/image.png',
        numTextSpaces: 1,
        width: 610,
        height: 457,
    },
    {
        src: '/images/jobs.jpg',
        numTextSpaces: 1,
        width: 500,
        height: 375,
    },
    {
        src: '/images/ned.jpeg',
        numTextSpaces: 1,
        width: 1280,
        height: 800,
    },
    {
        src: '/images/oldie.png',
        numTextSpaces: 1,
        width: 640,
        height: 480,
    },
    {
        src: '/images/one-does-not.jpg',
        numTextSpaces: 1,
        width: 545,
        height: 321,
    },
    {
        src: '/images/penguin.png',
        numTextSpaces: 1,
        width: 610,
        height: 610,
    },
    {
        src: '/images/phone.jpg',
        numTextSpaces: 1,
        width: 615,
        height: 409,
    },
    {
        src: '/images/sad.png',
        numTextSpaces: 1,
        width: 610,
        height: 636,
    },
    {
        src: '/images/sponge.png',
        numTextSpaces: 1,
        width: 500,
        height: 333,
    },
    {
        src: '/images/trump.jpg',
        numTextSpaces: 1,
        width: 2319,
        height: 1546,
    },
    {
        src: '/images/vict-baby.png',
        numTextSpaces: 1,
        width: 926,
        height: 616,
    },
    {
        src: '/images/web.png',
        numTextSpaces: 1,
        width: 610,
        height: 388,
    },
    {
        src: '/images/wolf.png',
        numTextSpaces: 1,
        width: 610,
        height: 457,
    },
]


export const Gallery = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMeme, setSelectedMeme] = useState();

    const handleOpen = (index) => {
        setSelectedMeme(index);
        setModalOpen(true);
    };
    
    const handleClose = () => {
        setSelectedMeme(null);
        setModalOpen(false);
    };

    return (
        <div>
            <h1>Gallery</h1>
            <ImageList rowHeight={400} cols={3}>
                {templates.map((el, index) => (
                    <ImageListItem key={el.src} cols={el.cols || 1} onClick={() => handleOpen(index)}>
                        <GalleryMeme meme={el} />    
                    </ImageListItem>
                ))}                     
            </ImageList>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div>
                    <MemeMinter meme={templates[selectedMeme]} />
                </div>
            </Modal>
        </div>
    )
}
