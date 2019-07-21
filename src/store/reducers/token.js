import {
  POST_TOKEN_BEGIN,
  POST_TOKEN_SUCCESS,
  POST_TOKEN_ERROR,
} from './../actions/token';

const initialState = {
  auth_token: null,
  loading: false,
  error: null
};

const tokenReducer = (state = initialState, action) => {
  switch(action.type) {
    case POST_TOKEN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_TOKEN_SUCCESS:
        return {
        ...state,
        loading: false,
        auth_token: action.payload.data.auth_token,
      };
    case POST_TOKEN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        auth_token: null,
      };
    default:
      return state
  }
};

export default tokenReducer;
