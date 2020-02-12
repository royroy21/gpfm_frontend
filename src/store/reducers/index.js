import { combineReducers } from 'redux'

import forwardGeocodingReducer from './forwardGeocoding';
import genresReducer from './genres';
import ipapiReducer from './ipapi';
import registerReducer from './register';
import tokenReducer from './token'
import userReducer from './user';

export default combineReducers({
  forwardGeocoding: forwardGeocodingReducer,
  genres: genresReducer,
  ipapi: ipapiReducer,
  register: registerReducer,
  token: tokenReducer,
  user: userReducer,
})
