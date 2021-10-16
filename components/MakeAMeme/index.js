import styles from 'styles/Home.module.css';
import { Gallery } from 'components/MakeAMeme/Gallery';
import { Header } from "components/common-ui/header";

export function MakeAMeme() {
  return (
    <div className={styles.container}>
      <Header title="Mint A Meme"/>
      <main className={styles.main}>
        <Gallery />
      </main>
    </div>
  )
}