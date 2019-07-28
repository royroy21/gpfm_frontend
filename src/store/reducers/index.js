import { combineReducers } from 'redux'
import tokenReducer from './token'
import userReducer from './user';
import registerReducer from './register';

export default combineReducers({
  register: registerReducer,
  token: tokenReducer,
  user: userReducer,
})
