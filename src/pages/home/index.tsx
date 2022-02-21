import { MemeCollection } from 'src/pages/home/collection';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UserProfile, NFTMeme } from 'src/utils/types';
import { DefaultPage } from 'components/default-page';
import { MemeMarket } from './market';
import { DankMinter } from './minter';
const axios = require('axios');

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
  const {account, deactivate, userProfile} = props;
  const [page, setPage] = useState(1)
  const [data, setData] = useState([]);

  useEffect(() => {
    if (account) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/assets?user=${account}&collection=${process.env.NEXT_PUBLIC_DANKMINTER_COLLECTION_CONTRACT_ADDRESS}`)
        .then(function (response) {
            setData((prevData) => [...response.data.result]);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  }, [account, page]);

  const addMemeToCollection = (boughtMeme: NFTMeme) => {
    setData((prevData) => [boughtMeme, ...prevData]);
  }

  return (
    <DefaultPage
      {...props}>
        <DankMinter userProfile={props.userProfile} />
        {props.account && <MemeCollection 
          {...props}
          data={data}
        />}
        <MemeMarket 
          addMemeToCollection={addMemeToCollection}
        />
    </DefaultPage>
  )
}