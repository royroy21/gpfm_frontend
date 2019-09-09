import { combineReducers } from 'redux'

import genresReducer from './genres';
import ipapiReducer from './ipapi';
import registerReducer from './register';
import tokenReducer from './token'
import userReducer from './user';

export default combineReducers({
  genres: genresReducer,
  ipapi: ipapiReducer,
  register: registerReducer,
  token: tokenReducer,
  user: userReducer,
})
