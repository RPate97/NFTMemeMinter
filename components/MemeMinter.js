import React, { useState, useEffect, useRef } from 'react'
import { FormGroup, Label } from 'reactstrap'
import PropTypes from 'prop-types'
import { styles } from '../styles/styles'
import Draggable from 'react-draggable';
import Slider from '@material-ui/core/Slider';

export const MemeMinter = (props) => {
    const [topX, setTopX] = useState("50%");
    const [topY, setTopY] = useState("10%");
    const [bottomX, setBottomX] = useState("50%");
    const [bottomY, setBottomY] = useState("90%");
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    const [topTextRotation, setTopTextRotation] = useState(0);
    const [bottomTextRotation, setBottomTextRotation] = useState(0);
    const [base64URL, setBase64URL] = useState(null);
    const svgRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        getBase64Image(props.meme.src, function(base64image) {
            setBase64URL(base64image);
        });
    }, []);

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
        //   dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
          callback(dataURL); // the base64 string
        };
        // set attributes and src 
        // img.setAttribute('crossOrigin', 'anonymous'); //
        img.src = imgUrl;
    }

    function convertSvgToImage() {
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
        };
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
                    ref={imageRef}
                    xlinkHref={base64URL}
                    height={600 / (props.meme.width / props.meme.height)}
                    width={600}
                />
                <Draggable>
                    <g>
                        <text
                            style={{...styles.memeText, transform: `translate(${topX}, ${topY}) rotate(${topTextRotation}deg)`}}
                            dominantBaseline="middle"
                            textAnchor="middle">
                            {topText}
                        </text>  
                    </g>                        
                </Draggable>                    
                <Draggable>
                    <g>
                        <text
                            style={{...styles.memeText, transform: `translate(${bottomX}, ${bottomY}) rotate(${bottomTextRotation}deg)`}}
                            dominantBaseline="middle"
                            textAnchor="middle">
                            {bottomText}
                        </text>  
                    </g>                         
                </Draggable>
            </svg>
            <div className="meme-form">
                <FormGroup>
                    <Label style={{color: "#fff"}} for="toptext">Top Text: </Label>
                    <input className="form-control" type="text" name="toptext" id="toptext" placeholder="Add text to the top" onChange={(e) => changeText(e, 0)} />
                    <Slider style={{width: 200, marginLeft: 20, transform: "translate(0, 35%)"}} value={topTextRotation} onChange={handleTopChange} aria-labelledby="continuous-slider" min={0} max={360} />
                </FormGroup>
                <FormGroup>
                    <Label style={{color: "#fff"}} for="bottomtext">Bottom Text: </Label>
                    <input className="form-control" type="text" name="bottomtext" id="bottomtext" placeholder="Add text to the bottom" onChange={(e) => changeText(e, 1)} />
                    <Slider style={{width: 200, marginLeft: 20, transform: "translate(0, 35%)"}} value={bottomTextRotation} onChange={handleBottomChange} aria-labelledby="continuous-slider" min={0} max={360} />
                </FormGroup>
                <button onClick={() => convertSvgToImage()} className="btn btn-primary">Mint Meme NFT!</button>
            </div>
        </div>
    )
}

MemeMinter.propTypes = {

}
