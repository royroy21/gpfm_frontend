import {
  GET_COUNTRIES_BEGIN,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_ERROR,
} from './../actions/countries';

const initialState = {
  objects: null,
  loading: false,
  error: null,
};

const countriesReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_COUNTRIES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_COUNTRIES_SUCCESS:
        return {
        ...state,
        loading: false,
        objects: action.payload.data,
      };
    case GET_COUNTRIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state
  }
};

export default countriesReducer;
