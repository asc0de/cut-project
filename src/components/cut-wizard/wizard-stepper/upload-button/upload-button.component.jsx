import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { parseImage } from '../../../../helpers/app-helper';
import './upload-button.component.css';

class UploadButton extends Component {
    onFileUpload() {
        parseImage(this.inputFile.files[0])
            .then(parsedData => {
                this.props.onUpload(parsedData.photo, parsedData.image);
            });
    }
    onUploadButtonClick(e) {
        this.inputFile.click();
    }
    render() { 
        return (
            <RaisedButton primary={true} label="Загрузите изображение" onClick={this.onUploadButtonClick.bind(this)} primary={true}>
                <input type="file" 
                ref={input => this.inputFile = input} 
                className="uploader" 
                onChange={this.onFileUpload.bind(this)}
                accept="image/*"></input>
            </RaisedButton>
        )
    }
}
 
export default UploadButton;