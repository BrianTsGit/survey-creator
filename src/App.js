import React, { Component } from 'react';
import './App.css';

import SurveyCreator from './container/SurveyCreator/SurveyCreator';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SurveyCreator />
      </div>
    );
  }
}

export default App;
