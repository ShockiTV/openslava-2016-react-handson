// Step 1
// const getMessage = () => "Hello World";
// document.getElementById('app').innerHTML = getMessage();


// // Step 2
// ReactDOM.render(
//     <h1>Hello OpenSlava!</h1>,
//     document.getElementById('app')
// );

// Step 3
// const App = (props) => (
//     <div>
//         <h1>Hello {props.name}, second version !</h1>
//     </div>
// );
//
// ReactDOM.render(
//     <App name="OpenSlava" />,
//     document.getElementById('app')
// );

// Step 4 - drawing an chessboard
// I prefer to start bottom-up, because this way I'm always working with something that
// already exists. If I were to build the Board first, I wouldn't see my results until
// I'm done with the Square. On the other hand, I can build and see the Square right
// away without even thinking of the Board.
var Pawn = React.createClass({
  render: function () {
    return <div style={{
        fontSize: 40,
        fontWeight: 'bold'
      }}>&#9817;</div>;
  }
});

var Square = React.createClass({
  render: function () {
    var fill = this.props.isBlack ? 'black' : 'white';
    var stroke = this.props.isBlack ? 'white' : 'black';

    if (this.props.isSelected) {
        fill = 'green';
    }

    return (
        <div style={{
            backgroundColor: fill,
            color: stroke,
            width: '100%',
            height: '100%'
        }}>
            {this.props.children}
        </div>
    );
  }
});

var Board = React.createClass({
  handleSquareClick: function(x, y) {
      this.props.onClick(x, y);
  },

  renderSquare: function (i) {
      var x = i % 8;
      var y = Math.floor(i / 8);
      var isBlack = (x + y) % 2 === 1;

      var isSelected = (i === this.props.selected);
      var piece = (this.props.boardData[i] === 'w') ? <Pawn /> : <div>&nbsp;</div>;

      return (
        <div
            key={i}
            style={{ width: '12.5%', height: '12.5%' }}
            onClick={this.handleSquareClick.bind(this, x, y)}
        >
            <Square isBlack={isBlack} isSelected={isSelected}>
              {piece}
            </Square>
        </div>
      );
  },

  render: function () {
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
});

var Game = React.createClass({
    handleClick: function(x, y) {
        var index = y * 8 + x;
        var selected = (index === this.state.selected) ? null : index
        this.setState({selected: selected});
    },

    getInitialState: function() {
        var boardData = [];
        for (let i = 0; i < 64; i++) {
            boardData.push('');
        }
        boardData[0] = boardData[2] = boardData[4] = boardData[6] = 'w';
        boardData[9] = boardData[11] = boardData[13] = boardData[15] = 'w';

        var selected = null;

        return { boardData: boardData, selected: selected };
    },

    render: function () {
        return (
            <Board
                boardData={this.state.boardData}
                selected={this.state.selected}
                onClick={this.handleClick}
            />);
    }
});

ReactDOM.render(
    <Game />, document.getElementById('app'));



// function counterStore(state, action) {
//     if (typeof state === 'undefined') {
//         return 0;
//     }
//
//     switch (action.type) {
//         case 'INCREMENT':
//         return state + 1
//         case 'DECREMENT':
//         return state - 1
//         default:
//         return state;
//     }
// };
// let store = Redux.createStore(counterStore);
//
//
//
// const Message = (props) => (
//     <div>
//         <h1>Hello {props.name}, second version !</h1>
//         <p>Current count is {props.count}</p>
//     </div>
// );
//
// const mapStateToProps = (state) => {
//   return {
//     count: state
//   }
// }
// const MessageContainer = ReactRedux.connect(mapStateToProps)(Message);
//
//
//
// const App = (props) => (
//     <ReactRedux.Provider store={store}>
//         <MessageContainer name="Openslava #3" />
//     </ReactRedux.Provider>
// );
//
//
// ReactDOM.render(
//     <App />,
//     document.getElementById('app')
// );





//
// var store = Redux.createStore(counter);
// store.subscribe(render);