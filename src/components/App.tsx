import * as React from 'react';
import './styles/App.css';

import PathFinder from './PathFinder';

class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <header>
          <h1>Theta* Demo</h1>
        </header>
        <PathFinder />
      </div>
    );
  }
}

export default App;
