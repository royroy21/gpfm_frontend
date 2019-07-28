import {
  POST_REGISTER_BEGIN,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_ERROR,
  CLEAR_REGISTER,
} from './../actions/register';

const initialState = {
  loading: false,
  error: null,
};

const registerReducer = (state = initialState, action) => {
  switch(action.type) {
    case POST_REGISTER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_REGISTER_SUCCESS:
        return {
        ...state,
        loading: false,
      };
    case POST_REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CLEAR_REGISTER:
      return {
        loading: false,
        error: null,
      };
    default:
      return state
  }
};

export default registerReducer;
