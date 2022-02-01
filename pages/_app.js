import React from 'react';
import '../styles/globals.css';
import { ChainId, DAppProvider, } from '@usedapp/core';
import { ChakraProvider } from "@chakra-ui/react";
import { WalletCache } from "src/components/wallet-cache";

function MyApp({ Component, pageProps, router }) {
  const config = {
    readOnlyChainId: parseInt(process.env.NEXT_PUBLIC_DAPP_PROVIDER_CHAIN_ID),
    readOnlyUrls: {
      [parseInt(process.env.NEXT_PUBLIC_DAPP_PROVIDER_CHAIN_ID)]: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    },
  }

  if (router.pathname.startsWith('/memetemplate') | router.pathname.startsWith('/memeTemplate') | router.pathname.startsWith('/admin')) {
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
