import { combineReducers } from 'redux'

import countriesReducer from './countries';
import forwardGeocodingReducer from './forwardGeocoding';
import {gigReducer, gigsReducer} from './gigs';
import genresReducer from './genres';
import ipapiReducer from './ipapi';
import locationReducer from './location';
import registerReducer from './register';
import tokenReducer from './token'
import userReducer from './user';

export default combineReducers({
  countries: countriesReducer,
  forwardGeocoding: forwardGeocodingReducer,
  gig: gigReducer,
  gigs: gigsReducer,
  genres: genresReducer,
  ipapi: ipapiReducer,
  location: locationReducer,
  register: registerReducer,
  token: tokenReducer,
  user: userReducer,
})
