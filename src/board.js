import React from 'react';
import Square from './square.js';
import Pawn from './pawn.js';

class Board extends React.Component {

    renderSquare(index) {
        var x = index % 8;
        var y = Math.floor(index / 8);
        var isBlack = ((x + y) % 2) === 1;

        // var isHighlighted = this.props.boardData[index].isHighlighted;
        // var isSelected = (index === this.props.selectedPawn);
        // var piece = (this.props.boardData[index].fig === 'w') ? <Pawn /> : null;
        // var cursor = (isHighlighted || piece) ? 'pointer' : 'auto';

        return (
          // onClick={this.handleSquareClick.bind(this, index)}
          <div
              key={index}
              style={{ width: '12.5%', height: '12.5%' }}
          >
              {/* isSelected={isSelected} isHighlighted={isHighlighted} */}
              <Square isBlack={isBlack}>
                <Pawn />
              </Square>
          </div>
        );
    }

    render() {
        var squares = [];
        for (let i = 0; i < 64; i++) {
            squares.push(this.renderSquare(i));
        }

        return (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap'
            }}>
                {squares}
            </div>
        );
    }
};

export default Board;