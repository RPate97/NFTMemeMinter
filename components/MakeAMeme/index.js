import styles from 'styles/Home.module.css';
import { Gallery } from 'components/MakeAMeme/Gallery';
import { Header } from "components/common-ui/header";
import { useEthers } from '@usedapp/core';

export function MakeAMeme() {
  const {activateBrowserWallet, account, deactivate } = useEthers();

  return (
    <div className={styles.container}>
      <Header title="Mint A Meme"/>
      <main className={styles.main}>
        <Gallery account={account} deactivate={deactivate} />
      </main>
    </div>
  )
}