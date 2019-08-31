import { combineReducers } from 'redux'

import genresReducer from './genres';
import registerReducer from './register';
import tokenReducer from './token'
import userReducer from './user';

export default combineReducers({
  genres: genresReducer,
  register: registerReducer,
  token: tokenReducer,
  user: userReducer,
})
