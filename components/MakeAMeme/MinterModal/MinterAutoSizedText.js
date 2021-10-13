import React, { useState } from 'react'
import { Rnd } from "react-rnd"
import { Textfit } from 'react-textfit'
import { styles } from '../../../styles/styles'

export const MinterAutoSizedText = ({borderStyle, text, rotation, width, height, x, y, id, changeSectionSize, changeSectionLocation}) => {
    const [textWidth, setTextWidth] = useState(width);
    const [textHeight, setTextHeight] = useState(height);

    return (
        <Rnd
            id={"resizable" + id}
            style={borderStyle}
            size={{
                width:textWidth,
                height:textHeight, 
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
                setTextWidth(rect.width);
                setTextHeight(rect.height);
                changeSectionSize(rect.width, rect.height, id);
            }}
            onResize={(e, direction, ref, d) => {
                e.preventDefault(); 
                e.stopPropagation();
                var el = document.getElementById("resizable" + id); // or other selector like querySelector()
                var rect = el.getBoundingClientRect();
                setTextWidth(rect.width);
                setTextHeight(rect.height);
            }}
            onDragStop={(e, d) => {
                changeSectionLocation(d.x, d.y, id);
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
