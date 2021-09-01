import React from 'react'
import Image from 'next/image'

export const GalleryMeme = (props) => {
    return (
        <div>
            <Image width={500} height={500} src={props.meme.src} />
        </div>
    )
}
