import { Gallery } from 'src/pages/MakeAMeme/Gallery';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { DefaultPage } from 'components/default-page';
import { UserProfile } from 'src/utils/types';

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

export const MakeAMeme: React.FC<Props> = (props) => {
  const {activateBrowserWallet, account, deactivate, userProfile} = props;
  return (
    <DefaultPage
            {...props}
        >
        <Gallery account={account} deactivate={deactivate} userProfile={userProfile} />
    </DefaultPage>
  )
}