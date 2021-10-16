import React from 'react';
import '../styles/globals.css'
import { ChainId, DAppProvider, } from '@usedapp/core'
import { ChakraProvider } from "@chakra-ui/react";
import { MemeMinterTemplate } from "pages/memeTemplate";
const templateType = React.createElement(MemeMinterTemplate).type;

const config = {
  readOnlyChainId: ChainId.Ropsten,
  readOnlyUrls: {
    [ChainId.Ropsten]: 'https://127.0.0.1:8545',
  },
}

function MyApp({ Component, pageProps, router }) {
  if (router.pathname.startsWith('/memetemplate') | router.pathname.startsWith('/memeTemplate')) {
    return (
      <ChakraProvider>
        <Component {...pageProps} />  
      </ChakraProvider>
    )  
  } else {
    return (
      <ChakraProvider>
        <DAppProvider config={config}>
          <Component {...pageProps} />  
        </DAppProvider>
      </ChakraProvider>
    )  
  }

}

export default MyApp
