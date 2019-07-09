import {
  POST_LOGIN_BEGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_ERROR,
} from './actions';

const initialState = {
  user: {},
  loading: false,
  error: null
};

const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case POST_LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_LOGIN_SUCCESS:
        return {
        ...state,
        loading: false,
        user: action.payload.data,
      };
    case POST_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        user: {},
      };
    default:
      return state
  }
};

export default loginReducer;
