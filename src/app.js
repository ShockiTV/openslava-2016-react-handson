import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import boardReducer from './board-reducer.js';
import BoardContainer from './board-container.js';

let store = createStore(boardReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
            <BoardContainer />
        </Provider>
    );
  }
};

export default App;