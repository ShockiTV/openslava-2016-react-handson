import React from 'react';

class Square extends React.Component {
  render() {
      var fill = this.props.isBlack ? 'black' : 'white';
      var stroke = this.props.isBlack ? 'white' : 'black';

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