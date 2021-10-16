import Head from 'next/head'
import { styles } from '../styles/styles.js'
import { BackgroundVideo } from '../components/BackgroundVideo'
import { Landing } from '../components/Landing'
import { FAQ } from '../components/FAQ'
import { WalletBar } from 'components/common-ui/wallet-bar'
import { Header } from "components/common-ui/header"

export default function Home() {
  return (
    <div>
      <Header title="DankMinter"/>
      <main style={styles.main}>
        <WalletBar />
        <Landing />
        <FAQ />
        {/* <BackgroundVideo style={styles.background} /> */}
      </main>
    </div>
  )
}
