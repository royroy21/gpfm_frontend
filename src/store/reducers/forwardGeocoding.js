import {
  GET_FORWARD_GEOCODING_BEGIN,
  GET_FORWARD_GEOCODING_SUCCESS,
  GET_FORWARD_GEOCODING_ERROR,
} from './../actions/forwardGeocoding';

const initialState = {
  objects: null,
  loading: false,
  error: null,
};

const forwardGeocodingReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_FORWARD_GEOCODING_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_FORWARD_GEOCODING_SUCCESS:
        return {
        ...state,
        loading: false,
        objects: action.payload.data,
      };
    case GET_FORWARD_GEOCODING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state
  }
};

export default forwardGeocodingReducer;
