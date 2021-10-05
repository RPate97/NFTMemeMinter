import Head from 'next/head'
import { styles } from '../styles/styles.js'
import { BackgroundVideo } from '../components/BackgroundVideo'
import { Landing } from '../components/Landing'
import { FAQ } from '../components/FAQ'
import { NavBar } from '../components/NavBar'
import { AxiosProvider, Request, Get, Delete, Post, Put, Patch, withAxios } from 'react-axios'

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
        <Get url="/api/hello" params={{}}>
          {(error, response, isLoading, makeRequest, axios) => {
            if(error) {
              return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
            }
            else if(isLoading) {
              return (<div>Loading...</div>)
            }
            else if(response !== null) {
              return (<div>{response.data.name} <button onClick={() => makeRequest({ params: { refresh: true } })}>Refresh</button></div>)
            }
            return (<div>Default message before request is made.</div>)
          }}
        </Get>
      </main>
    </div>
  )
}
