import { useEthers } from '@usedapp/core';
import { useState, useEffect } from 'react';
const axios = require('axios');

export const WalletCache = (props) => {
    const {activateBrowserWallet, account, deactivate} = useEthers();
    const [userProfile, setUserProfile] = useState();
    const [token, setToken] = useState(() => {
      return getTokenFromStorage();
    });
  
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
        <>{props.children({
            activateBrowserWallet, 
            account, 
            deactivate,
            doneConnecting,
            setDoneConnecting,
            token,
            setToken,
            userProfile, 
            setUserProfile,
            getUserProfile,
        })}</>
    )
}