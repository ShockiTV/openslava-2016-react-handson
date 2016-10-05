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

// Step 4
function counterStore(state, action) {
    if (typeof state === 'undefined') {
        return 0;
    }

    switch (action.type) {
        case 'INCREMENT':
        return state + 1
        case 'DECREMENT':
        return state - 1
        default:
        return state;
    }
};
let store = Redux.createStore(counterStore);



const Message = (props) => (
    <div>
        <h1>Hello {props.name}, second version !</h1>
        <p>Current count is {props.count}</p>
    </div>
);

const mapStateToProps = (state) => {
  return {
    count: state
  }
}
const MessageContainer = ReactRedux.connect(mapStateToProps)(Message);



const App = (props) => (
    <ReactRedux.Provider store={store}>
        <MessageContainer name="Openslava #3" />
    </ReactRedux.Provider>
);


ReactDOM.render(
    <App />,
    document.getElementById('app')
);





//
// var store = Redux.createStore(counter);
// store.subscribe(render);