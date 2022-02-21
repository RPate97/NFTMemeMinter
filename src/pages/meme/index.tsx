import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';
import { PageMeme } from './components/page-meme';
import { Spinner } from '@chakra-ui/spinner';
import { DefaultPage } from 'components/default-page';
import React, { Dispatch, SetStateAction } from 'react';
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
    getUserProfile: (userToken: string) => Promise<UserProfile>,
}

export const Meme: React.FC<Props> = (props) => {
    const router = useRouter();
    const { memeHash } = router.query;
    
    const [{ data, loading, error }, refetch] = useAxios({
        url: `/api/dankmeme/${memeHash}`,
    });

    return (
        <DefaultPage {...props}>
            {loading || !data
                ? <Spinner /> 
                : <PageMeme meme={data} />
            }            
        </DefaultPage>
   );
}