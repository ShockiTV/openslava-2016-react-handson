import React from 'react';
import { connect } from 'react-redux';

import clickOnSquareAction from './board-action.js';

import Board from './board.js';

class BoardContainer extends React.Component {
  render() {
    return (
        <Board
            boardData={this.props.boardData}
            selectedPawn={this.props.selectedPawn}
            onClick={this.props.clickOnSquareAction}
        />
    );
  }
};

const mapStateToProps = (state) => {
    return {
        boardData: state.boardReducer.boardData,
        selectedPawn: state.boardReducer.selectedPawn
    }
};
const mapDispatchToProps = { clickOnSquareAction };
BoardContainer = connect(mapStateToProps, mapDispatchToProps)(BoardContainer);

export default BoardContainer;