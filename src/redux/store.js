// import { createStore,applyMiddleware,compose} from "redux";
// import {composeWithDevTools} from 'redux-devtools-extension';
// import thunk from 'redux-thunk'
// import rootReducer from './reducer';

// const store = createStore(
//   rootReducer,compose(applyMiddleware(thunk),
//   composeWithDevTools()) 
// );

// export default store;


import { createStore,applyMiddleware,compose} from "redux";

import thunk from 'redux-thunk'
import rootReducer from './reducer';

const store = createStore(rootReducer,applyMiddleware(thunk));

export default store;
