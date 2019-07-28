import {
  POST_TOKEN_BEGIN,
  POST_TOKEN_SUCCESS,
  POST_TOKEN_ERROR,
  CLEAR_TOKEN,
} from './../actions/token';

const initialState = {
  object: null,
  loading: false,
  error: null,
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
        object: action.payload.data,
      };
    case POST_TOKEN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        object: null,
      };
    case CLEAR_TOKEN:
      return {
        object: null,
        loading: false,
        error: null,
      };
    default:
      return state
  }
};

export default tokenReducer;
