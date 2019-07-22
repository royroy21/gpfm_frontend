import { combineReducers } from 'redux'
import tokenReducer from './token'
import userReducer from './user';


export default combineReducers({
  token: tokenReducer,
  user: userReducer,
})
