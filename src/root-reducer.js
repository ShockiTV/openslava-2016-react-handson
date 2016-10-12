import { combineReducers } from 'redux';

import boardReducer from './board-reducer.js';

const rootReducer = combineReducers({
    boardReducer: boardReducer
});

export default rootReducer;