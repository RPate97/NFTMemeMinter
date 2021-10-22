import React from 'react'
import { useRouter } from 'next/router'
import { MemeModal } from 'components/MemeCollection/memeModal';
import { MemeContainer } from './meme';

export const Meme = ({account}) => {
  const router = useRouter();
  const { memeHash } = router.query;

  return (
    <>
      {memeHash ? <MemeContainer memeHash={memeHash} account={account} /> : null}
    </>
  )
}