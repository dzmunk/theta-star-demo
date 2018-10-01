import * as React from 'react';
import './styles/App.css';

import PathFinder from './PathFinder';

class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <header>
          <h1>Theta* Demo</h1>
          <p>See how Theta* finds the most efficient (たぶん) any-angle path!</p>
        </header>
        <PathFinder />
      </div>
    );
  }
}

export default App;
