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

      var isHighlighted = this.props.boardData[i].isHighlighted;
      var isSelected = (i === this.props.selectedPawn);
      var piece = (this.props.boardData[i].fig === 'w') ? <Pawn /> : null;
      var cursor = (isHighlighted || piece) ? 'pointer' : 'auto';

      return (
        <div
            key={i}
            style={{ width: '12.5%', height: '12.5%', cursor: cursor }}
            onClick={this.handleSquareClick.bind(this, x, y)}
        >
            <Square isBlack={isBlack} isSelected={isSelected} isHighlighted={isHighlighted}>
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

function toXY(index) {
    return (index != null)
        ? {x: index % 8, y: Math.floor(index / 8)}
        : {x: -10, y: -10};
};

function toIndex(x, y) {
    return y * 8 + x;
};

var Game = React.createClass({
    canSelectPawn: function(index) {
        return (this.state.boardData[index].fig === 'w');
    },

    isAllowedMove: function(fromIndex, toIndex) {
        var from = toXY(fromIndex);
        var to = toXY(toIndex);
        return (Math.abs(from.x - to.x) === 1 && Math.abs(from.y - to.y) === 1)
    },

    updateCanMoveArea: function(boardData, selectedPawn) {
        boardData.forEach(function(squareData, index) {
            if (squareData.fig !== '') {
                squareData.isHighlighted = false;
            } else {
                squareData.isHighlighted = this.isAllowedMove(selectedPawn, index);
            }
        }, this);

        return boardData;
    },

    handleClick: function(x, y) {
        var index = y * 8 + x;

        var boardData = this.state.boardData;

        // If pawn selected, check if we move the Pawn
        // REMOVE '!= null' and watch first Pawn
        if (this.state.selectedPawn != null) {
            if (this.isAllowedMove(this.state.selectedPawn, toIndex(x, y))) {
                if (boardData[toIndex(x, y)].fig === '') {
                    // move Pawn
                    boardData[toIndex(x, y)].fig = boardData[this.state.selectedPawn].fig;
                    boardData[this.state.selectedPawn].fig = '';
                }
            }
        }

        var selectedPawn = (this.canSelectPawn(index) && index !== this.state.selectedPawn) ? index : null;

        boardData = this.updateCanMoveArea(boardData, selectedPawn);

        this.setState({selectedPawn: selectedPawn, boardData: boardData});
    },

    getInitialState: function() {
        var boardData = [];
        for (let i = 0; i < 64; i++) {
            boardData.push({fig: '', isHighlighted: false});
        }
        boardData[0].fig = boardData[2].fig = boardData[4].fig = boardData[6].fig = 'w';
        boardData[9].fig = boardData[11].fig = boardData[13].fig = boardData[15].fig = 'w';

        var selectedPawn = null;

        return { boardData: boardData, selectedPawn: selectedPawn };
    },

    render: function () {
        return (
            <Board
                boardData={this.state.boardData}
                selectedPawn={this.state.selectedPawn}
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