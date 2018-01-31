import React, { Component } from 'react';
import WizardStepper from './wizard-stepper/wizard-stepper.component';
import './cut-wizard.component.css';

class CutWizard extends Component {
    state = {}
    render() { 
        return (
            <div className="cut-wizard-container">
                <WizardStepper/>
            </div>
        )
    }
}
 
export default CutWizard;