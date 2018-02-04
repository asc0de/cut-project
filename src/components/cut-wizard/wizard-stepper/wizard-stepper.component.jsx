import React, { Component } from 'react';
// material ui
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Slider from 'material-ui/Slider';
// Custom components
import UploadButton from './upload-button/upload-button.component';
import UploadPlaceholder from './upload-placeholder/upload-placeholder.component';
import AvatarEditor from 'react-avatar-editor';
import { getImageSize, loadFileToUser, isMobile } from '../../../helpers/app-helper';
import { Route, withRouter } from 'react-router-dom';
// Icons
import RotateRight from 'material-ui/svg-icons/image/rotate-right';
import RotateLeft from 'material-ui/svg-icons/image/rotate-left';
import './wizard-stepper.component.css';

class WizardStepper extends Component {
    state = {
      finished: false,
      stepIndex: 0,
      image: null,
      file: null,
      blobUrl: './placeholder.jpg',
      imageEditor: {
        rotate: 0,
        scale: 1
      }
    };

    // Controls
    rotateRight() {
      this.setState({
        imageEditor: {
          ...this.state.imageEditor,
          rotate: this.state.imageEditor.rotate += 90
        }
      })
    }

    rotateLeft() {
      this.setState({
        imageEditor: {
          ...this.state.imageEditor,
          rotate: this.state.imageEditor.rotate -= 90
        }
      })
    }

    onScaleChange(e, value) {
      this.setState({
        imageEditor: {
          ...this.state.imageEditor,
          scale: value
        }
      })
    }

    onUpload = (file, image) => {
      this.setState({file: file, image: image, imageInfo: getImageSize(image)},this.handleNext);
    }
  
    handleNext = () => {
      const {stepIndex} = this.state;
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      });
      this.handleRoute(stepIndex + 1);
    };
  
    handlePrev = () => {
      const {stepIndex} = this.state;
      if (stepIndex > 0) {
        this.setState({stepIndex: stepIndex - 1});
        this.handleRoute(stepIndex - 1);
      }
    };

    onFirstStep = () => {
      const {stepIndex} = this.state;
      this.setState({stepIndex: 0});
      this.handleRoute(0);
    };

    handleRoute = index => {
      let route = null;
      switch(index) {
        case 0:
          route = "/";
          break;
        case 1:
          route = "/cut";
          break;
        case 2:
          route = "/result";
          break;
        default:
          route = "/";
          break;
      }
      this.props.history.push(route);
    }

    onCutClick = () => {
      let image = this.editor.getImage();
      loadFileToUser(image, "cut_" + this.state.file.name, blob => {
        this.setState({
          blobUrl: URL.createObjectURL(blob)
        });
      });
      this.handleNext();
    }

    setEditorRef = editor => {
      this.editor = editor;
    }

    indexPage = props => {
      return (<UploadPlaceholder onUpload={this.onUpload.bind(this)}/>);
    };

    cutPhotoPage = props => {
      return (
        <AvatarEditor 
          ref={this.setEditorRef.bind(this)} 
          image={this.state.file} 
          style={{...this.state.imageInfo}}
          rotate={this.state.imageEditor.rotate}
          scale={this.state.imageEditor.scale}/>
      );
    };

    loadResultPage = props => {
      return (
        <img alt='Обрезанное изображение фото' src={this.state.blobUrl}/>
      );
    }
  
    getStepContent(stepIndex) {
      switch (stepIndex) {
        case 0:
          return (
            <Route exact path="/" component={this.indexPage}/>
          );
        case 1:
          return (
            <Route path="/cut" component={this.cutPhotoPage}/>            
          );
        case 2:
          return (
            <Route path="/result" component={this.loadResultPage}/>
          );
        default:
          return (
            <Route exact path="/" component={this.indexPage}/>
          );
      }
    }
    getStepButtons(stepIndex) {
        switch (stepIndex) {
            case 0:
              return (
                <div className='action-buttons'>
                  <UploadButton onUpload={this.onUpload.bind(this)}/>
                </div>
              );
            case 1:
              return (
                <div className='action-buttons'>
                    <div className="action-buttons-section">
                      <IconButton onClick={this.rotateLeft.bind(this)} tooltip="Повернуть влево" touch={true} tooltipPosition="top-center">
                        <RotateLeft />
                      </IconButton>
                      <IconButton onClick={this.rotateRight.bind(this)} tooltip="Повернуть вправо" touch={true} tooltipPosition="top-center">
                        <RotateRight />
                      </IconButton>
                    </div>
                    <div className="action-buttons-section">
                      <span style={{marginRight: "1em"}}>Масштаб:</span>
                      <Slider 
                        defaultValue={1} 
                        min={1} 
                        max={3} 
                        onChange={this.onScaleChange.bind(this)}
                        style={{flex: "1"}}
                        sliderStyle={{marginTop: "0", marginBottom: "1em"}}/>
                    </div>
                    <div className="action-buttons-section">
                      <RaisedButton label='Назад' onClick={this.handlePrev.bind(this)}/>
                      <RaisedButton label='Обрезать' primary={true} onClick={this.onCutClick.bind(this)}/>
                    </div>
                </div>
              );
            default:
              return <RaisedButton label='Обрезать новое фото' primary={true} onClick={this.onFirstStep.bind(this)}/>;
          }
    }
  
    render() {
      const {finished, stepIndex} = this.state;  
      return (
        <div className='wizard-stepper-container'>
            <Stepper activeStep={stepIndex}>
                <Step>
                    <StepLabel>Загрузите картинку</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Обрежьте</StepLabel>
                </Step>
            </Stepper>
            <div className='wizard-stepper-content'>
                {this.getStepContent(this.state.stepIndex)}
            </div>
            {this.getStepButtons(this.state.stepIndex)}
        </div>
      );
    }
}

  export default withRouter(WizardStepper);