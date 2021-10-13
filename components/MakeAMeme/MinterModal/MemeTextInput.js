import React from 'react'
import { FormGroup, Label } from 'reactstrap'
import Slider from '@material-ui/core/Slider'

export const MemeTextInput = ({handleTextInfoChange, textInfo, index}) => {
    const handleRotationChange = (event, newValue) => {
        console.log("handle rotation change");
        textInfo.rotation = newValue;
        handleTextInfoChange(textInfo, index);
    };

    const changeText = (event, index) => {
        console.log("handle text change");
        textInfo.text = event.currentTarget.value;
        handleTextInfoChange(textInfo, index);
    }

    return (
        <div>
            <FormGroup>
                <Label style={{color: "#fff"}} for="toptext">Text {index}: </Label>
                <input className="form-control" type="text" name="toptext" id="toptext" placeholder="Add caption" onChange={changeText} />
                <Slider style={{width: 200, marginLeft: 20, transform: "translate(0, 35%)"}} value={textInfo.rotation} onChange={handleRotationChange} aria-labelledby="continuous-slider" min={-180} max={180} />
            </FormGroup>
        </div>
    )
}
