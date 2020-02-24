import {
  CLEAR_LOCATION,
  GET_LOCATION_BEGIN,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_ERROR,
  POST_LOCATION_BEGIN,
  POST_LOCATION_SUCCESS,
  POST_LOCATION_ERROR,
} from './../actions/location';

const initialState = {
  object: null,
  loading: false,
  error: null,
};

const locationReducer = (state = initialState, action) => {
  switch(action.type) {
    case CLEAR_LOCATION:
      return {
        object: null,
        loading: false,
        error: null,
      };
    case GET_LOCATION_BEGIN:
    case POST_LOCATION_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_LOCATION_SUCCESS:
    case POST_LOCATION_SUCCESS:
      return {
        object: action.payload.data,
        loading: false,
        error: null,
      };
    case GET_LOCATION_ERROR:
    case POST_LOCATION_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state
  }
};

export default locationReducer;
