import { useState, useEffect } from 'react';
import { styles } from 'styles/styles.js';
import { Header } from 'components/common-ui/header';
import { useEthers } from '@usedapp/core';
import { ConnectWalletButton } from 'components/common-ui/connect-wallet-button/index.js';
import { MemeCollection } from 'components/MemeCollection/index.js';
const axios = require('axios');

export default function Home() {
  const {activateBrowserWallet, account, deactivate} = useEthers();
  const [userProfile, setUserProfile] = useState();
  const [token, setToken] = useState(() => {
    return getTokenFromStorage();
  })

  const [doneConnecting, setDoneConnecting] = useState(token ? true : false);

  useEffect(() => {
    if (!account) {
      setToken(getTokenFromStorage());
      const finishConnecting = token !== null ? true : false;
      setDoneConnecting(finishConnecting);
    }
  }, [account, token])

  function getTokenFromStorage() {
    if (typeof(Storage) !== "undefined") {
      // Code for localStorage/sessionStorage.
      const userToken = localStorage.getItem("token");
      getUserProfile(userToken);
      return userToken;
    } else {
      // Sorry! No Web Storage support..
      return null;
    }
  }

  async function getUserProfile(userToken) {
    if (userToken) {
        const res = await axios.post('/api/fetchProfile', {token: userToken});
        setUserProfile(res.data.user);
        return res.data.user;
    } else {
        console.log("token not set");
    }
  }

  return (
    <div>
      <Header title="DankMinter"/>
      <main style={styles.main}>
        {account && doneConnecting && token && userProfile ? 
          <MemeCollection account={account} deactivate={deactivate}/>
        : <ConnectWalletButton activateBrowserWallet={activateBrowserWallet} account={account} setDoneConnecting={setDoneConnecting} token={token} setToken={setToken} userProfile={userProfile} setUserProfile={setUserProfile} getUserProfile={getUserProfile} />}
      </main>
    </div>
  )
}
