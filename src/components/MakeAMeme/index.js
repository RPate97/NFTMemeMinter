import styles from 'styles/Home.module.css';
import { Gallery } from 'src/components/MakeAMeme/Gallery';
import { Header } from "src/components/common-ui/header";

export function MakeAMeme({activateBrowserWallet, account, deactivate, userProfile}) {
  return (
    <div className={styles.container}>
      <Header title="Mint A Meme"/>
      <main className={styles.main}>
        <Gallery account={account} deactivate={deactivate} userProfile={userProfile} />
      </main>
    </div>
  )
}