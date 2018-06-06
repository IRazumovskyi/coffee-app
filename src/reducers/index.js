import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import apiCalls from './apiCalls';
import changeTheme from "./changeTheme";
import modal from "./modal"

export default combineReducers({
    routing: routerReducer,
    apiCalls,
    changeTheme,
    modal
});
