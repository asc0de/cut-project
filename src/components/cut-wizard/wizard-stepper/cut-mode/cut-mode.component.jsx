import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
// Icons
import CropSquare from 'material-ui/svg-icons/image/crop-square';
import CropCircle from 'material-ui/svg-icons/image/panorama-fish-eye';

class CutMode extends Component {
    constructor() {
        super();
        this.state = {
            border: 0
        }
    }
    renderButton() {
        if (this.state.border === 0) {
            return (
                <IconButton onClick={this.toCircle.bind(this)} tooltip="Квадрат" touch={true} tooltipPosition="top-center">
                    <CropSquare/>
                </IconButton>
            )
        }
        if (this.state.border === 100) {
            return (
                <IconButton onClick={this.toSquare.bind(this)} tooltip="Круг" touch={true} tooltipPosition="top-center">
                    <CropCircle/>
                </IconButton>
            )
        }
    }
    toSquare() {
        this.setState({
            border: 0
        }, () => {
            this.props.onModeChange(this.state.border)
        });
    }
    toCircle() {
        this.setState({
            border: 100
        }, () => {
            this.props.onModeChange(this.state.border)
        });
    }
    render() {
        return this.renderButton();
    }
}
 
export default CutMode;