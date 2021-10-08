import React from 'react'
import Image from "next/image";

export default function MinterImage(props) {
    return (
        <>
            {props.src ? (<Image
                style={{...props.style}}
                unoptimized={true}
                alt="meme"
                src={props.src}
                height={props.height}
                width={props.width}
            />) : (<div></div>)} 
        </>
    )
}
