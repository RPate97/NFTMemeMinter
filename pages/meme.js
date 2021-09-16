import Head from 'next/head'
import { styles } from '../styles/styles.js'
import React from 'react'
import { NavBar } from '../components/NavBar'
import { BackgroundVideo } from '../components/BackgroundVideo'
import { Meme } from '../components/MemePage/Meme'
import { MemeInfo } from '../components/MemePage/MemeInfo'


const memeInfo = {
    name: "The Very First Meme Minted with NFTMemeMachine", 
    description: "This is the original meme.", 
    image: "https://gateway.pinata.cloud/ipfs/QmWQLKpFvuot3K43SbWvMoKdZ34vVTPKrgRmZTdVTLqrqo",
    attributes: [
        {
            trait_type: "Creator", 
            value: "Pate"
        }, 
        {
            trait_type: "Print Number", 
            value: 1
        }, 
        {
            display_type: "date", 
            trait_type: "creation date", 
            value: 1630370139
        },
        {
            trait_type: "Total Minted",
            value: 1
        },
    ],
    memeHash: '0x884a40adebfc03dfbee9f9688d42183823adedbc057624cabe4fc3a86f46a2eb',
    imgHash: '0x69696969420',
    score: 1,
    uri: 'https://gateway.pinata.cloud/ipfs/QmPtKsbdZk59qcpoW5V47C78mZCYqiFJE5FgJHVsJApWd8',
    postings: [
        'https://www.reddit.com',
        'https://www.google.com',
        'https://www.youtube.com',
    ],
}

export default function MemePage() {
    return (
        <div>
        <Head>
            <title>NFT Meme Minter</title>
            <meta name="description" content="The only meme generator that mints your memes as NFTs." />
            <meta name="google" content="notranslate" />
        </Head>
  
        <main style={styles.main}>
            <NavBar />
            <div style={styles.memePage}>
                <Meme style={styles.memePage.image} memeInfo={memeInfo} />
                <MemeInfo style={styles.memePage.info} memeInfo={memeInfo} />
            </div>
            <BackgroundVideo style={styles.background} />
        </main>
      </div>
    )
}
