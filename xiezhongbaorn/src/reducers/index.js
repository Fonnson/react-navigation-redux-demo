import {combineReducers} from 'redux';
import {login} from './loginReducer';
import {nav} from './navReducer';


const AppReducer = combineReducers({
    login,
    nav,
});

export default AppReducer;
