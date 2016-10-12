let canSelectPawn = function(boardData, index) {
    return (boardData[index].fig === 'w');
};

let toXY = function(index) {
    return (index != null)
        ? {x: index % 8, y: Math.floor(index / 8)}
        : {x: -10, y: -10};
};

let isAllowedMove = function(fromIndex, toIndex) {
    var from = toXY(fromIndex);
    var to = toXY(toIndex);
    return (Math.abs(from.x - to.x) === 1 && Math.abs(from.y - to.y) === 1)
};

let updateCanMoveArea = function(boardData, selectedPawn) {
    boardData.forEach(function(squareData, index) {
        if (squareData.fig !== '') {
            squareData.isHighlighted = false;
        } else {
            squareData.isHighlighted = isAllowedMove(selectedPawn, index);
        }
    });

    return boardData;
};

var getMyInitialState = function() {
    var boardData = [];
    for (let i = 0; i < 64; i++) {
        boardData.push({fig: '', isHighlighted: false});
    }
    boardData[0].fig = boardData[2].fig = boardData[4].fig = boardData[6].fig = 'w';
    boardData[9].fig = boardData[11].fig = boardData[13].fig = boardData[15].fig = 'w';

    var selectedPawn = null;

    return { boardData: boardData, selectedPawn: selectedPawn };
};

var boardReducer = function(stateOld, action) {
    if (typeof stateOld === 'undefined') {
        return getMyInitialState();
    }

    switch (action.type) {
        case 'SQUARECLICK':
            var state = JSON.parse(JSON.stringify(stateOld)); // TRY without this
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
            return stateOld;
    }
};

export default boardReducer;