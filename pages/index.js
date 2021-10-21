import { styles } from 'styles/styles.js';
import { Header } from 'components/common-ui/header';
import { ConnectWalletButton } from 'components/common-ui/connect-wallet-button/index.js';
import { MemeCollection } from 'components/MemeCollection/index.js';

export default function Home({account, activateBrowserWallet, deactivate, doneConnecting, setDoneConnecting, token, setToken, userProfile, setUserProfile, getUserProfile}) {
  return (
    <div>
      <Header title="DankMinter"/>
      <main style={styles.main}>
        {account && doneConnecting && token && userProfile ? 
          <MemeCollection 
            account={account} 
            deactivate={deactivate}/>
        : <ConnectWalletButton 
            activateBrowserWallet={activateBrowserWallet} 
            account={account} 
            setDoneConnecting={setDoneConnecting} 
            token={token} 
            setToken={setToken} 
            userProfile={userProfile} 
            setUserProfile={setUserProfile} 
            getUserProfile={getUserProfile}/>}
      </main>
    </div>
  )
}
