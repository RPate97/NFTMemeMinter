import '../styles/globals.css'
import { ChainId, DAppProvider, } from '@usedapp/core'
import { ChakraProvider } from "@chakra-ui/react";

const config = {
  readOnlyChainId: ChainId.Ropsten,
  readOnlyUrls: {
    [ChainId.Ropsten]: 'https://127.0.0.1:8545',
  },
}

function MyApp({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <ChakraProvider>
        <Component {...pageProps} />      
      </ChakraProvider>
    </DAppProvider>
  )
}

export default MyApp
