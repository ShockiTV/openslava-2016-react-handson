import React from 'react';
import Pawn from './pawn.js';
import Board from './board.js';

class App extends React.Component {
  render() {
    return (
        <div>
            <h1>Hello {this.props.name}, second version !</h1>
            <Board />
        </div>
    );
  }
};

export default App;
