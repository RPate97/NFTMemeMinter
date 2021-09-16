import Head from 'next/head'
import { styles } from '../styles/styles.js'
import { BackgroundVideo } from '../components/BackgroundVideo'
import { Landing } from '../components/Landing'
import { FAQ } from '../components/FAQ'
import { NavBar } from '../components/NavBar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>NFT Meme Minter</title>
        <meta name="description" content="The only meme generator that mints your memes as NFTs." />
        <meta name="google" content="notranslate" />
      </Head>

      <main style={styles.main}>
        <NavBar />
        <Landing />
        <FAQ />
        <BackgroundVideo style={styles.background} />
      </main>
    </div>
  )
}
