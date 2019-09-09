import {
  GET_IPAPI_BEGIN,
  GET_IPAPI_SUCCESS,
  GET_IPAPI_ERROR,
} from './../actions/ipapi';

const initialState = {
  object: null,
  loading: false,
  error: null,
};

const ipapiReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_IPAPI_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_IPAPI_SUCCESS:
        return {
        ...state,
        loading: false,
        object: action.payload.data,
      };
    case GET_IPAPI_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state
  }
};

export default ipapiReducer;
