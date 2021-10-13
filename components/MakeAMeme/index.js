import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Gallery } from '../components/Gallery'

export default function MakeAMeme() {
  return (
    <div className={styles.container}>
      <Head>
        <title>DankMinter</title>
        <meta name="description" content="A dank meme generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Gallery />
      </main>
    </div>
  )
}