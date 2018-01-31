import React, { Component } from 'react';
import CutWizard from '../cut-wizard/cut-wizard.component';
import './content.component.css';

class Content extends Component {
    state = {}
    render() { 
        return (
        <div className="content">
            <CutWizard/>
        </div>);
    }
}
 
export default Content;