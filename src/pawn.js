import React from 'react';

// https://en.wikipedia.org/wiki/Chess_symbols_in_Unicode
class Pawn extends React.Component {
  render() {
    return (
        <div style={{
            fontSize: 40,
            fontWeight: 'bold'
          }}>&#9817;</div>
    );
  }
};

export default Pawn;