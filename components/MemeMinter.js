import React, { useState, useEffect, useRef } from 'react'
import { FormGroup, Label } from 'reactstrap'
import { styles } from '../styles/styles'
import Slider from '@material-ui/core/Slider'
import { MinterAutoSizedText } from './MinterAutoSizedText'
import Button from '@material-ui/core/Button';

export default class MemeMinter extends React.Component {
    constructor(props) {
        super(props);
        var memeHeight = (600 / (this.props.meme.width / this.props.meme.height));
        this.state = {
            borderStyle: {
                border: "solid 1px #ddd",
                borderStyle: "dashed",
                borderRadius: 10,
            },
            textLocations: [
                {
                    x: (600 - 400) / 2,
                    y: (600 / (props.meme.width / props.meme.height)) / 20,
                    text: "Caption 1",
                    rotation: 0,
                    height: 60,
                    width: 400,
                    key: 0,
                },
                {
                    x: (600 - 400) / 2,
                    y: (600 / (props.meme.width / props.meme.height)) - (600 / (props.meme.width / props.meme.height)) / 6.5,
                    text: "Caption 2",
                    rotation: 0,
                    height: 60,
                    width: 400,
                    key: 1,
                }
            ],
            base64URL: "",
            memeWidth: 600,
            memeHeight: memeHeight,
        };
        this.svgRef = React.createRef();
    }

    getBase64Image(imgUrl, callback) {
        var img = new Image();    
        img.onload = function(){
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL("image/png");
            callback(dataURL); // the base64 string
        }
        img.src = imgUrl;
    }

    componentDidMount = () => {
        var img = new Image();    
        img.onload = () => {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL("image/png");
            this.setState(prevState => ({
                ...prevState,
                base64URL: dataURL,
            }));            
        }
        img.src = this.props.meme.src;
    }

    componentDidUpdate() {
        if (this.state.borderStyle.border !== "solid 1px #ddd") {
            let svg = this.svgRef.current;
            let svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement("canvas");
            canvas.setAttribute("id", "canvas");
            const svgSize = svg.getBoundingClientRect();
            canvas.width = svgSize.width;
            canvas.height = svgSize.height;
            const img = document.createElement("img");
            img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));
            img.onload = () => {
                canvas.getContext("2d").drawImage(img, 0, 0);
                const canvasdata = canvas.toDataURL("image/png");
                const a = document.createElement("a");
                console.log(img.src); // send this in a post to the server
                a.download = "meme.png";
                a.href = canvasdata;
                document.body.appendChild(a);
                a.click();
                this.updateBorderStyle({border: "solid 1px #ddd", borderStyle: "dashed", borderRadius: 10});
            };             
        }
    }

    updateBorderStyle(newBorderStyleObject) {
        this.setState(prevState => ({
            ...prevState,
            borderStyle: newBorderStyleObject,
        }));
    }

    changeText(newText, index) {
        this.setState(prevState => ({
            ...prevState,
            textLocations: prevState.textLocations.map(el => el.key === index ? { ...el, text: newText } : el)
        }));
    }

    changeRotation(newRotation, index) {
        this.setState(prevState => ({
            ...prevState,
            textLocations: prevState.textLocations.map(el => el.key === index ? { ...el, rotation: newRotation } : el)
        }));
    }

    changeSectionSize = (newWidth, newHeight, index) => {
        this.state.textLocations[index].height = newHeight;
        this.state.textLocations[index].width = newWidth;
    }

    changeSectionLocation = (newX, newY, index) => {
        this.state.textLocations[index].x = newX;
        this.state.textLocations[index].y = newY;
    }

    render() {
        return (
            <div>
                <svg
                    ref={this.svgRef}
                    width={600}
                    id="svg_ref"
                    height={600 / (this.props.meme.width / this.props.meme.height)}
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink">
                    <image
                        xlinkHref={this.state.base64URL}
                        height={600 / (this.props.meme.width / this.props.meme.height)}
                        width={600}
                    />
                    <foreignObject width={`${this.state.memeWidth}`} height={`${this.state.memeHeight}`}>
                        {this.state.textLocations.map((el, index) => (
                            <MinterAutoSizedText 
                                borderStyle={this.state.borderStyle}
                                text={el.text} 
                                rotation={el.rotation} 
                                height={el.height} 
                                width={el.width} 
                                x={el.x}
                                y={el.y}
                                id={el.key}
                                key={el.key}
                                changeSectionLocation={this.changeSectionLocation}
                                changeSectionSize={this.changeSectionSize}
                                />                            
                        ))}
                    </foreignObject>
                    <text style={styles.watermark} x="10" y={`${this.state.memeHeight - 10}`}>
                        Minted with NFTMemeMinter.com, Creator: Pate
                    </text>
                </svg>
                <div className="meme-form">
                    {this.state.textLocations.map((el, index) => (
                        <FormGroup key={el.key}>
                            <Label style={{color: "#fff"}} for={"toptext" + el.key}>Caption: {el.key + 1}</Label>
                            <input className="form-control" type="text" name={"toptext" + el.key} id={"toptext" + el.key} placeholder="Add a caption" onChange={(e) => this.changeText(e.currentTarget.value, index)} />
                            <Slider style={{width: 200, marginLeft: 20, transform: "translate(0, 35%)"}} value={el.rotation} onChange={(e, val) => this.changeRotation(val, el.key)} aria-labelledby="continuous-slider" min={-180} max={180} />
                        </FormGroup>                        
                    ))}
                    <Button onClick={() => this.updateBorderStyle({border: "solid 0px #ddd"})} className="btn btn-primary">Mint Meme NFT!</Button>
                </div>
            </div>
        )        
    }; 
}
