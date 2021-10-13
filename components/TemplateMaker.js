import React, { useState, useEffect, useRef } from 'react'
import { FormGroup, Label } from 'reactstrap'
import { styles } from '../styles/styles'
import Slider from '@material-ui/core/Slider'
import { MinterAutoSizedText } from './MakeAMeme/MinterModal/MinterAutoSizedText'
import Button from '@material-ui/core/Button';
const axios = require('axios');

// template db spec
// {
//     src: source image url        (string)
//     width: image width           (int)
//     height: image height         (int)
//     textLocations: [{            (object)
//        x: x location             (int)
//        y: y location             (int)
//        text: caption             (string)
//        rotation: angle           (int)
//        height: text area height  (int)
//        width: text area width    (int)
//        key: location key         (int)
//     }]
// },

export default class TemplateMaker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            borderStyle: {
                border: "solid 1px #ddd",
                borderStyle: "dashed",
                borderRadius: 10,
            },
            textLocations: [],
            base64URL: "",
            selectedFile: null,
            memeWidth: 600,
            memeHeight: 600,
        };
        this.svgRef = React.createRef();
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
        /*eslint-disable */
        this.state.textLocations[index].height = newHeight; 
        this.state.textLocations[index].width = newWidth;
        /*eslint-enable */
    }

    changeSectionLocation = (newX, newY, index) => {
        /*eslint-disable */
        this.state.textLocations[index].x = newX;
        this.state.textLocations[index].y = newY;
        /*eslint-enable */
    }

    removeImage() {
        this.setState(prevState => ({
            ...prevState,
            base64URL: "",
        }));
    }

    changeImage(event) {
        var reader = new FileReader();
        reader.onload = (e) => {
            var img = new Image();    
            img.onload = () => {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                var dataURL = canvas.toDataURL("image/png");
                var height = (500 / (img.width / img.height));
                this.setState(prevState => ({
                    ...prevState,
                    base64URL: dataURL,
                    selectedFile: event.target.files[0],
                    memeWidth: 500,
                    memeHeight: height,
                }));            
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    }

    addTextSection() {
        var newKey = this.state.textLocations.length;
        var x = this.state.memeWidth / 2 - 100;
        var y = this.state.memeHeight / 2 - 100;
        var label = "Caption " + (newKey + 1);
        var newTextSection = {
            x: x,
            y: y,
            text: label,
            rotation: 0,
            height: 120,
            width: 200,
            key: newKey,
        };
        this.setState(prevState => ({
            ...prevState,
            textLocations: [
                ...prevState.textLocations,
                newTextSection,
            ]
        }));
    }

    removeTextSection() {
        var newSections = this.state.textLocations;
        newSections.pop();
        this.setState(prevState => ({
            ...prevState,
            textLocations: newSections,
        }));
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
                a.download = "meme.png";
                a.href = canvasdata;
                document.body.appendChild(a);
                // a.click();
                this.updateBorderStyle({border: "solid 1px #ddd", borderStyle: "dashed", borderRadius: 10});
            };             
        }
    }

    resizeImg() {
        this.updateBorderStyle({visibility: "hidden"});
    }

    uploadPhoto = async () => {
        const file = this.state.selectedFile;
        const filename = encodeURIComponent(file.name);
        const res = await fetch(`/api/uploadGCloud?file=${filename}`);
        const { url, fields } = await res.json();
        const formData = new FormData();
    
        Object.entries({ ...fields, file }).forEach(([key, value]) => {
          formData.append(key, value);
        });
    
        const upload = await axios.post(`/api/uploadGCloud?file=${filename}`, formData);

        return upload.data.filePath;
    };

    async saveTemplate() {
        this.resizeImg();
        // resize image
        // upload image to object store
        const url = await this.uploadPhoto();
        var template = {
            src: url,
            width: this.state.memeWidth,
            height: this.state.memeHeight,
            textLocations: this.state.textLocations,
        };
        console.log(template);

        // upload template to mongodb
        await axios.post('/api/createTemplate', template)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
        return (
            <div>
            {this.state.base64URL !== "" ?
                <div>
                    <svg
                        ref={this.svgRef}
                        width={this.state.memeWidth}
                        id="svg_ref"
                        height={this.state.memeHeight}
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink">
                        <image
                            xlinkHref={this.state.base64URL}
                            height={this.state.memeHeight}
                            width={this.state.memeWidth}
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
                                    changeSectionSize={this.changeSectionSize}
                                    changeSectionLocation={this.changeSectionLocation}/>                            
                            ))}
                        </foreignObject>
                    </svg> 
                    <div className="meme-form">
                        <Button onClick={() => this.saveTemplate()}>Save Template!</Button>
                        <Button onClick={() => this.removeImage()}>Remove Template</Button>
                        <Button onClick={() => this.addTextSection()}>Add Caption</Button>
                        <Button onClick={() => this.removeTextSection()}>Remove Caption</Button>
                    </div>
                </div>  
            : <input type="file" name="file" onChange={(e) => this.changeImage(e)} />
            }                
            </div>
        )        
    }; 
}
