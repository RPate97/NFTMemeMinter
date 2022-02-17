import { styles } from 'styles/styles.js';
import { Header } from 'src/components/common-ui/header';
import { ConnectWalletButton } from 'src/components/common-ui/connect-wallet-button/index.js';
import { MemeCollection } from 'src/components/MemeCollection';
import React, { Dispatch, SetStateAction } from 'react';
import { UserProfile } from 'src/utils/types';
import { DefaultPage } from 'components/default-page';

type Props = {
  account: string,
  activateBrowserWallet: () => void,
  deactivate: () => void,
  doneConnecting: boolean,
  setDoneConnecting: Dispatch<SetStateAction<boolean>>,
  token: string,
  setToken: Dispatch<SetStateAction<string>>,
  userProfile: UserProfile,
  setUserProfile: Dispatch<SetStateAction<UserProfile | null>>,
  getUserProfile: (userToken: string) => Promise<void>,
}

export const Home = (props) => {
  return (
    <DefaultPage
      {...props}>
        <MemeCollection 
          {...props}
        />
    </DefaultPage>
  )
}