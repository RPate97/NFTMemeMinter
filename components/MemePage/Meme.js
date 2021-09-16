import React from 'react'
import Image from 'next/image'

export const Meme = ({memeInfo}) => {
    return (
        <div>
          <Image src={memeInfo.image} width={500} height={500} alt="Picture of the author" />
        </div>
    )
}