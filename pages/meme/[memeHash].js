import React from 'react';
import { useRouter } from 'next/router';
import { MemeContainer } from './meme';

export default function Meme({account}) {
  const router = useRouter();
  const { memeHash } = router.query;

  return (
    <>
      {memeHash ? <MemeContainer memeHash={memeHash} account={account} /> : null}
    </>
  )
}