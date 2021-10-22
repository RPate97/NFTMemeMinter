import React from 'react';
import '../styles/globals.css';
import { ChainId, DAppProvider, } from '@usedapp/core';
import { ChakraProvider } from "@chakra-ui/react";
import { WalletCache } from "components/wallet-cache";

const config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]: 'http://127.0.0.1:8545',
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
          <WalletCache>
            {appProps => (
              <Component {...pageProps}
                {...appProps}
              />  
            )}            
          </WalletCache>
        </DAppProvider>
      </ChakraProvider>
    )  
  }

}

export default MyApp
