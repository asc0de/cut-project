import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Content from './components/content/content.component';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (        
      <MuiThemeProvider>
        <Router>
          <div className="app">
            <AppBar title="Обрезать картинку" showMenuIconButton={false}/>
            <Content/>
        </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
