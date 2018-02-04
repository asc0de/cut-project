import React, { Component } from 'react';
import { parseImage } from '../../../../helpers/app-helper';
import './upload-placeholder.component.css';

class UploadPlaceholder extends Component {
    onFileUpload() {
        parseImage(this.inputFile.files[0])
            .then(parsedData => {
                this.props.onUpload(parsedData.photo, parsedData.image);
            });
    }
    onImageClick(e) {
        this.inputFile.click();
    }
    render() { 
        return (
            <div>
                <img alt='Схематическое изображение фото' src='./placeholder.jpg' onClick={this.onImageClick.bind(this)}/>
                <input type="file" 
                ref={input => this.inputFile = input} 
                className="uploader" 
                onChange={this.onFileUpload.bind(this)}
                accept="image/*"></input>
            </div>
        )
    }
}
 
export default UploadPlaceholder;