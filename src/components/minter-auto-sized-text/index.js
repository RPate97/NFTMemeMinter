import React, { useState } from 'react'
import { Rnd } from "react-rnd"
import { Textfit } from 'react-textfit'
import { styles } from 'styles/styles';

export const MinterAutoSizedText = ({borderStyle, text, rotation, width, height, x, y, id, changeSectionSize, changeSectionLocation}) => {
    const [textWidth, setTextWidth] = useState(width);
    const [textHeight, setTextHeight] = useState(height);
    const [textX, setTextX] = useState(x);
    const [textY, setTextY] = useState(y);

    return (
        <Rnd
            id={"resizable" + id}
            style={{
                ...borderStyle,
                top: textY,
                left: textX
            }}
            size={{
                width:textWidth,
                height:textHeight, 
            }}
            position={{
                x: textX,
                y: textY,
            }}
            onResizeStop={(e, direction, ref, d) => {
                e.preventDefault(); 
                e.stopPropagation();
                var el = document.getElementById("resizable" + id);
                var rect = el.getBoundingClientRect();
                setTextWidth(rect.width);
                setTextHeight(rect.height);
                changeSectionSize(rect.width, rect.height, id);
            }}
            onResize={(e, direction, ref, d) => {
                e.preventDefault(); 
                e.stopPropagation();
                var el = document.getElementById("resizable" + id);
                var rect = el.getBoundingClientRect();
                setTextWidth(rect.width);
                setTextHeight(rect.height);
            }}
            onDrag={(e, d) => {
                e.preventDefault(); 
                e.stopPropagation();
                setTextY((prev) => prev + d.deltaY);
                setTextX((prev) => prev + d.deltaX);
            }}
            onDragStop={(e, d) => {
                e.preventDefault(); 
                e.stopPropagation();
                changeSectionLocation(textX, textY, id);
            }}
            >
            <div>
                <Textfit mode="multi" min={12} max={50} style={{height: textHeight}}>
                    <p style={{...styles.memeText, transform: `rotate(${rotation}deg)`}}>{text}</p>
                </Textfit>                            
            </div>
        </Rnd>
    )
}
