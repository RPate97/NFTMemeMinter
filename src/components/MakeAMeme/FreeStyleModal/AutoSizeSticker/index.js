import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { styles } from 'styles/styles';
import Image from 'next/image';

export const AutoSizeSticker = ({borderStyle, sticker, rotation, width, height, x, y, id, changeStickerSize, changeStickerLocation}) => {
    const [stickerWidth, setStickerWidth] = useState(width);
    const [stickerHeight, setStickerHeight] = useState(height);

    return (
        <Rnd
            id={"resizable" + id}
            style={borderStyle}
            size={{
                width:stickerWidth,
                height:stickerHeight, 
            }}
            default={{
                x: x,
                y: y,
            }}
            onResizeStop={(e, direction, ref, d) => {
                e.preventDefault(); 
                e.stopPropagation();
                var el = document.getElementById("resizable" + id); // or other selector like querySelector()
                var rect = el.getBoundingClientRect();
                setStickerWidth(rect.width);
                setStickerHeight(rect.height);
                changeStickerSize(rect.width, rect.height, id);
            }}
            onResize={(e, direction, ref, d) => {
                e.preventDefault(); 
                e.stopPropagation();
                var el = document.getElementById("resizable" + id); // or other selector like querySelector()
                var rect = el.getBoundingClientRect();
                setStickerWidth(rect.width);
                setStickerHeight(rect.height);
            }}
            onDragStop={(e, d) => {
                changeStickerLocation(d.x, d.y, id);
            }}
            >
            <Image src={sticker.src} style={{transform: `rotate(${rotation}deg)`}} width={stickerWidth} height={stickerHeight} layout="fill" objectFit="contain" alt={`Sticker ${sticker.name}`} draggable={false}/>
        </Rnd>
    )
}
