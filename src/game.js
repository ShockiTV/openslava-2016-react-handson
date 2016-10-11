import React from 'react';
import Board from './board.js';


let canSelectPawn = function(boardData, index) {
    return (boardData[index].fig === 'w');
};

class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.getMyInitialState();
    }

    handleClick(index) {
        var boardData = this.state.boardData;
        var selectedPawn = (canSelectPawn(boardData, index) && index !== this.state.selectedPawn) ? index : null;

        this.setState({selectedPawn: selectedPawn});
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

        return { boardData: boardData, selectedPawn: null };
    }

    render() {
        return (<Board
            boardData={this.state.boardData}
            selectedPawn={this.state.selectedPawn}
            onClick={this.handleClick.bind(this)} />);
    }
};

export default Game;