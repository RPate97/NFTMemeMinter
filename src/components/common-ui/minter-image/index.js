import React from 'react'
import Image from "next/image";

export function MinterImage(props) {
    return (
        <>
            {props.src ? (<Image
                unoptimized={true}
                alt="meme"
                src={props.src}
                height={props.height}
                width={props.width}
            />) : (<div></div>)} 
        </>
    )
}
