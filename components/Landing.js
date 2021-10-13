import React from 'react'
import Head from 'next/head'
import Button from '@material-ui/core/Button';
import Link from 'next/link'
import { styles } from '../styles/styles'
import { Logo } from 'components/common-ui/logo'

export const Landing = () => {
    return (
        <div style={styles.intro}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Play:wght@700&family=Press+Start+2P&display=swap" rel="stylesheet" />      
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Play:wght@700&family=Press+Start+2P&display=swap" rel="stylesheet" />
            </Head>
            <div style={styles.intro.section}> 
                <h1 style={styles.intro.sectionTitle}>The meme generator that mints your memes as NFTs.</h1>    
                <h1 style={styles.intro.subtitle}>Guarenteed to be authentic, collectible, and truly one of a kind.</h1>                          
                <div style={styles.intro.actions}>
                    <Link href='/makeameme'>
                        <Button variant="outlined" style={styles.intro.startButton}>Mint a Meme</Button>
                    </Link>
                    <Link href='/whitepaper'>
                        <Button style={styles.intro.learnButton}>Read the White Paper</Button>
                    </Link>
                </div>
            </div>                
        </div>
    )
}
