import styles from 'styles/Home.module.css';
import { Gallery } from 'src/components/ApproveTemplates/Gallery';
import { Header } from "src/components/common-ui/header";

export function ApproveTemplates() {
  return (
    <div className={styles.container}>
      <Header title="Approve Templates"/>
      <main className={styles.main}>
        <Gallery />
      </main>
    </div>
  )
}