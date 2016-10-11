import React from 'react';

class Square extends React.Component {
  render() {
      var fill = this.props.isBlack ? 'black' : 'white';
      var stroke = this.props.isBlack ? 'white' : 'black';

      if (this.props.isSelected) {
          stroke = 'red';
      }

      if (this.props.isHighlighted) {
          fill = this.props.isBlack ? 'green' : 'yellow';
      }

      return (
          <div style={{
              backgroundColor: fill,
              color: stroke,
              width: '100%',
              height: '100%',
              textAlign: 'center'
          }}>
              {this.props.children}
          </div>
      );
  }
};

export default Square;