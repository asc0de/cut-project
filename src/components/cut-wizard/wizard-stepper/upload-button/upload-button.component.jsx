import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './upload-button.component.css';

class UploadButton extends Component {
    constructor() {
        super();
        this.photo = null;
        this.image = null;
    }
    onFileUpload() {
        this.photo = this.inputFile.files[0];
        let fr = new FileReader;

        fr.onload = function() {
            var img = new Image;

            img.onload = function() {
                this.image = img;
                this.props.onUpload(this.photo, this.image);
            }.bind(this);

            img.src = fr.result;
        }.bind(this);

        fr.readAsDataURL(this.photo = this.inputFile.files[0]);
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