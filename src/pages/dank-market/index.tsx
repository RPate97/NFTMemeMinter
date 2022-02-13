import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { MarketOrder, UserProfile } from 'src/utils/types';
import { DefaultPage } from 'components/default-page';
import { Text, Box } from "@chakra-ui/react";
import { ImmutableXClient } from '@imtbl/imx-sdk';
import useAxios from 'axios-hooks';
import { CollectionMeme } from "src/components/MemeCollection/collectionMeme";
import { NFTMeme } from "src/utils/types";
import { MarketMeme } from './market-meme';

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

export const DankMarket: React.FC<Props> = (props) => {
    const [page, setPage] = useState(1);
    const [{ data, loading, error }] = useAxios({
      url: `${process.env.NEXT_PUBLIC_API_URL}/orders`,
      params: { 
        page_size: 10,
        order_by: "created_at",
        status: "active",
        sell_token_address: process.env.NEXT_PUBLIC_DANKMINTER_COLLECTION_CONTRACT_ADDRESS
       },
    });

    console.log(data);

    return (
        <DefaultPage
            {...props}
        >
            {data && data.result && data.result.length > 0 
                ? <Box
                    padding={2}
                    w="100%"
                    mx="auto"
                    marginTop={4}
                    sx={{ columnCount: [1, 2, 3, 4], columnGap: "8px" }}
                >
                    {data.result.map((el: MarketOrder) => {
                        return (
                            <MarketMeme key={el.sell.data.token_id} order={el} />
                        )
                    })}             
                </Box> 
            : <></>} 
        </DefaultPage>
    );
}
