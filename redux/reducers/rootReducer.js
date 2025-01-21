import {combineReducers} from 'redux'
import {userReducer} from './userReducer'
const rootReducer = combineReducers({
  auths: userReducer,
});

export default rootReducer