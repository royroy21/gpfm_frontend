import { combineReducers } from 'redux'
import tokenReducer from './token'


export default combineReducers({
  token: tokenReducer,
})
