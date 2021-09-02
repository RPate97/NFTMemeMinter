import React, { useState, useEffect, useRef } from 'react'
import { FormGroup, Label } from 'reactstrap'
import { styles } from '../styles/styles'
import Slider from '@material-ui/core/Slider'
import { Rnd } from "react-rnd"
import { Textfit } from 'react-textfit'
import { MinterAutoSizedText } from './MinterAutoSizedText'

export const MemeMinter = (props) => {
    const [borderStyle, setBorderStyle] = useState({
        border: "solid 1px #ddd",
        borderStyle: "dashed",
        borderRadius: 10,
    });
    // const [textLocations, setTextLocations] = useState(() => {
    //     return [
    //         {
    //             x: (600 - 400) / 2,
    //             y: (600 / (props.meme.width / props.meme.height)) / 20,
    //             text: "hello world",
    //             rotation: 0,
    //             height: 60,
    //             width: 400,
    //         },
    //         {
    //             x: (600 - 400) / 2,
    //             y: (600 / (props.meme.width / props.meme.height)) - (600 / (props.meme.width / props.meme.height)) / 6.5,
    //             text: "hello world",
    //             rotation: 0,
    //             height: 60,
    //             width: 400,
    //         }
    //     ];
    // });

    const [topX, setTopX] = useState(() => {
        return (600 - 400) / 2;
    });
    const [topY, setTopY] = useState(() => {
        return (600 / (props.meme.width / props.meme.height)) / 20;
    });
    const [bottomX, setBottomX] = useState(() => {
        return (600 - 400) / 2;
    });
    const [bottomY, setBottomY] = useState(() => {
        return (600 / (props.meme.width / props.meme.height)) - (600 / (props.meme.width / props.meme.height)) / 6.5;
    });
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    const [topTextRotation, setTopTextRotation] = useState(0);
    const [bottomTextRotation, setBottomTextRotation] = useState(0);
    const [topTextWidth, setTopTextWidth] = useState(400);
    const [topTextHeight, setTopTextHeight] = useState(60);
    const [bottomTextWidth, setBottomTextWidth] = useState(400);
    const [bottomTextHeight, setBottomTextHeight] = useState(60);
    const [base64URL, setBase64URL] = useState(null);
    const svgRef = useRef(null);

    useEffect(() => {
        getBase64Image(props.meme.src, function(base64image) {
            setBase64URL(base64image);
        });
    }, []);

    useEffect(() => {
        if (borderStyle.border !== "solid 1px #ddd") {
            let svg = svgRef.current;
            let svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement("canvas");
            canvas.setAttribute("id", "canvas");
            const svgSize = svg.getBoundingClientRect();
            canvas.width = svgSize.width;
            canvas.height = svgSize.height;
            const img = document.createElement("img");
            img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));
            img.onload = function() {
                canvas.getContext("2d").drawImage(img, 0, 0);
                const canvasdata = canvas.toDataURL("image/png");
                const a = document.createElement("a");
                console.log(img.src); // send this in a post to the server
                a.download = "meme.png";
                a.href = canvasdata;
                document.body.appendChild(a);
                a.click();
                setBorderStyle({border: "solid 1px #ddd", borderStyle: "dashed", borderRadius: 10});
            };             
        }
    }, [borderStyle]);

    function changeText(event, textIndex) {
        if (textIndex == 0) {
            setTopText(event.currentTarget.value);
        } else {
            setBottomText(event.currentTarget.value);
        }
    }

    function getBase64Image(imgUrl, callback) {
        var img = new Image();    
        img.onload = function(){
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          var dataURL = canvas.toDataURL("image/png");
          callback(dataURL); // the base64 string
        };
        img.src = imgUrl;
    }

    function convertSvgToImage() {
        setBorderStyle({
            border: "solid 0px #ddd",
        });
    }

    const handleTopChange = (event, newValue) => {
        setTopTextRotation(newValue);
    };

    const handleBottomChange = (event, newValue) => {
        setBottomTextRotation(newValue);
    };

    return (
        <div>
            <svg
                ref={svgRef}
                width={600}
                id="svg_ref"
                height={600 / (props.meme.width / props.meme.height)}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink">
                <image
                    xlinkHref={base64URL}
                    height={600 / (props.meme.width / props.meme.height)}
                    width={600}
                />
                <foreignObject width={`${props.meme.width}`} height={`${props.meme.height}`}>
                    <MinterAutoSizedText 
                        borderStyle={borderStyle}
                        text={topText} 
                        rotation={topTextRotation} 
                        height={topTextHeight} 
                        width={topTextWidth} 
                        x={topX}
                        y={topY}
                        id={0}/>
                    <MinterAutoSizedText 
                        borderStyle={borderStyle}
                        text={bottomText} 
                        rotation={bottomTextRotation} 
                        height={bottomTextHeight} 
                        width={bottomTextWidth} 
                        x={bottomX}
                        y={bottomY}
                        id={1}/>
                    {/* <Rnd
                        id="topResizable"
                        style={borderStyle}
                        size={{
                            width:topTextWidth,
                            height:topTextHeight, 
                        }}
                        default={{
                            x: topX,
                            y: topY,
                        }}
                        onResizeStart={(e) => {setIsResizing(true); e.preventDefault(); e.stopPropagation()}}
                        onResizeStop={(e, direction, ref, d) => {
                            setIsResizing(false); 
                            e.preventDefault(); 
                            e.stopPropagation();
                            var el = document.getElementById("topResizable"); // or other selector like querySelector()
                            var rect = el.getBoundingClientRect();
                            setTopTextWidth(rect.width);
                            setTopTextHeight(rect.height);
                        }}
                        onResize={(e, direction, ref, d) => {
                            e.preventDefault(); 
                            e.stopPropagation();
                            var el = document.getElementById("topResizable"); // or other selector like querySelector()
                            var rect = el.getBoundingClientRect();
                            setTopTextWidth(rect.width);
                            setTopTextHeight(rect.height);
                        }}
                        >
                        <div>
                            <Textfit mode="multi" min={12} max={50} style={{height: topTextHeight}}>
                                <p style={{...styles.memeText, transform: `rotate(${topTextRotation}deg)`}}>{topText}</p>
                            </Textfit>                            
                        </div>
                    </Rnd>
                    <Rnd
                        id="bottomResizable"
                        style={borderStyle}
                        size={{
                            width:bottomTextWidth,
                            height:bottomTextHeight, 
                        }}
                        default={{
                            x: bottomX,
                            y: bottomY,
                        }}
                        onResizeStart={(e) => {setIsResizing(true); e.preventDefault(); e.stopPropagation()}}
                        onResizeStop={(e, direction, ref, d) => {
                            setIsResizing(false); 
                            e.preventDefault(); 
                            e.stopPropagation();
                            var el = document.getElementById("bottomResizable"); // or other selector like querySelector()
                            var rect = el.getBoundingClientRect();
                            setBottomTextWidth(rect.width);
                            setBottomTextHeight(rect.height);
                        }}
                        onResize={(e, direction, ref, d) => {
                            e.preventDefault(); 
                            e.stopPropagation();
                            var el = document.getElementById("bottomResizable"); // or other selector like querySelector()
                            var rect = el.getBoundingClientRect();
                            setBottomTextWidth(rect.width);
                            setBottomTextHeight(rect.height);
                        }}
                        >
                        <div>
                            <Textfit mode="multi" min={12} max={50} style={{height: bottomTextHeight}}>
                                <p style={{...styles.memeText, transform: `rotate(${bottomTextRotation}deg)`}}>{bottomText}</p>
                            </Textfit>                                
                        </div>
                    </Rnd>                      */}
                </foreignObject>
                <text style={styles.watermark} x="10" y={`${props.meme.height - 20}`}>
                    Minted with NFTMemeMinter.com, Creator: Pate
                </text>
            </svg>
            <div className="meme-form">
                <FormGroup>
                    <Label style={{color: "#fff"}} for="toptext">Top Text: </Label>
                    <input className="form-control" type="text" name="toptext" id="toptext" placeholder="Add text to the top" onChange={(e) => changeText(e, 0)} />
                    <Slider style={{width: 200, marginLeft: 20, transform: "translate(0, 35%)"}} value={topTextRotation} onChange={handleTopChange} aria-labelledby="continuous-slider" min={-180} max={180} />
                </FormGroup>
                <FormGroup>
                    <Label style={{color: "#fff"}} for="bottomtext">Bottom Text: </Label>
                    <input className="form-control" type="text" name="bottomtext" id="bottomtext" placeholder="Add text to the bottom" onChange={(e) => changeText(e, 1)} />
                    <Slider style={{width: 200, marginLeft: 20, transform: "translate(0, 35%)"}} value={bottomTextRotation} onChange={handleBottomChange} aria-labelledby="continuous-slider" min={-180} max={180} />
                </FormGroup>
                <button onClick={() => convertSvgToImage()} className="btn btn-primary">Mint Meme NFT!</button>
            </div>
        </div>
    )
}

MemeMinter.propTypes = {

}
