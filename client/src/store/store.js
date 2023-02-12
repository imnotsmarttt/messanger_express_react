import {combineReducers, createStore, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";

import authReducer from "./reducers/authReducer";
import chatReducer from "./reducers/chatReducer";

const composeEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const reducers = combineReducers({
    auth: authReducer,
    chat: chatReducer
})


const store = createStore(reducers, composeEnhancer)

window.store = store

export default store