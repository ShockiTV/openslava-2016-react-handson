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

function toXY(index) {
    return (index != null)
    ? {x: index % 8, y: Math.floor(index / 8)}
    : {x: -10, y: -10};
};

function toIndex(x, y) {
    return y * 8 + x;
};

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
            height: '100%',
            textAlign: 'center'
        }}>
            {this.props.children}
        </div>
    );
  }
});

var Board = React.createClass({
  handleSquareClick: function(index) {
      this.props.onClick(index);
  },

  renderSquare: function (index) {
      var xy = toXY(index);
      var isBlack = ((xy.x + xy.y) % 2) === 1;

      var isHighlighted = this.props.boardData[index].isHighlighted;
      var isSelected = (index === this.props.selectedPawn);
      var piece = (this.props.boardData[index].fig === 'w') ? <Pawn /> : null;
      var cursor = (isHighlighted || piece) ? 'pointer' : 'auto';

      return (
        <div
            key={index}
            style={{ width: '12.5%', height: '12.5%', cursor: cursor }}
            onClick={this.handleSquareClick.bind(this, index)}
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

function canSelectPawn(boardData, index) {
    return (boardData[index].fig === 'w');
};

function isAllowedMove(fromIndex, toIndex) {
    var from = toXY(fromIndex);
    var to = toXY(toIndex);
    return (Math.abs(from.x - to.x) === 1 && Math.abs(from.y - to.y) === 1)
};

function updateCanMoveArea(boardData, selectedPawn) {
    boardData.forEach(function(squareData, index) {
        if (squareData.fig !== '') {
            squareData.isHighlighted = false;
        } else {
            squareData.isHighlighted = isAllowedMove(selectedPawn, index);
        }
    });

    return boardData;
};

var Game = React.createClass({
    handleClick: function(index) {
        var boardData = this.state.boardData;

        // If pawn selected, check if we move the Pawn
        // REMOVE '!= null' and watch first Pawn
        if (this.state.selectedPawn != null) {
            if (isAllowedMove(this.state.selectedPawn, index)) {
                if (boardData[index].fig === '') {
                    // move Pawn
                    boardData[index].fig = boardData[this.state.selectedPawn].fig;
                    boardData[this.state.selectedPawn].fig = '';
                }
            }
        }

        var selectedPawn = (canSelectPawn(boardData, index) && index !== this.state.selectedPawn) ? index : null;

        boardData = updateCanMoveArea(boardData, selectedPawn);

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


// ReactDOM.render(
//     <Game />, document.getElementById('app'));


function getInitialState() {
    var boardData = [];
    for (let i = 0; i < 64; i++) {
        boardData.push({fig: '', isHighlighted: false});
    }
    boardData[0].fig = boardData[2].fig = boardData[4].fig = boardData[6].fig = 'w';
    boardData[9].fig = boardData[11].fig = boardData[13].fig = boardData[15].fig = 'w';

    var selectedPawn = null;

    return { boardData: boardData, selectedPawn: selectedPawn };
};

function boardReducer(stateold, action) {
    if (typeof stateold === 'undefined') {
        return getInitialState();
    }

    switch (action.type) {
        case 'SQUARECLICK':
            var state = JSON.parse(JSON.stringify(stateold)); // without this
            var index = action.index;
            var boardData = state.boardData;

            // If pawn selected, check if we move the Pawn
            // REMOVE '!= null' and watch first Pawn
            if (state.selectedPawn != null) {
                if (isAllowedMove(state.selectedPawn, index)) {
                    if (boardData[index].fig === '') {
                        // move Pawn
                        boardData[index].fig = boardData[state.selectedPawn].fig;
                        boardData[state.selectedPawn].fig = '';
                    }
                }
            }

            var selectedPawn = (canSelectPawn(boardData, index) && index !== state.selectedPawn) ? index : null;

            boardData = updateCanMoveArea(boardData, selectedPawn);

            return {
                selectedPawn: selectedPawn,
                boardData: boardData
            };
        default:
            return stateold;
    }
};

let store = Redux.createStore(boardReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

var clickOnSquareAction = function(index) {
    return {
        type: 'SQUARECLICK',
        index: index
    };
};

var BoardContainer = React.createClass({
    render: function() {
        return (
            <Board
                boardData={this.props.boardData}
                selectedPawn={this.props.selectedPawn}
                onClick={this.props.clickOnSquareAction}
            />
        );
    }
});
const mapStateToProps = (state) => {
    return {
        boardData: state.boardData,
        selectedPawn: state.selectedPawn
    }
};
const mapDispatchToProps = { clickOnSquareAction };
BoardContainer = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(BoardContainer);













const App = (props) => (
    <ReactRedux.Provider store={store}>
        <BoardContainer />
    </ReactRedux.Provider>
);

ReactDOM.render(
    <App />,
    document.getElementById('app')
);





//
// var store = Redux.createStore(counter);
// store.subscribe(render);