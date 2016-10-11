import React from 'react';
import Board from './board.js';

class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.getMyInitialState();
    }

    /* Invoked once before the component is mounted.
       The return value will be used as the initial value of this.state.
       In ES6 classes, you can define the initial state by assigning this.state in the constructor
     */
    getMyInitialState() {
        var boardData = [];
        for (let i = 0; i < 64; i++) {
            boardData.push({fig: '', isHighlighted: false});
        }
        boardData[0].fig = boardData[2].fig = boardData[4].fig = boardData[6].fig = 'w';
        boardData[9].fig = boardData[11].fig = boardData[13].fig = boardData[15].fig = 'w';

        return { boardData: boardData };
    }

    render() {
        //   selectedPawn={this.state.selectedPawn}
        //   onClick={this.handleClick}
        return (<Board boardData={this.state.boardData} />);
    }
};

export default Game;