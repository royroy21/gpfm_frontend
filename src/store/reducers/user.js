import {
  GET_USER_BEGIN,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  CLEAR_USER,
} from './../actions/user';

const initialState = {
  object: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_USER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USER_SUCCESS:
        return {
        ...state,
        loading: false,
        object: action.payload.data,
      };
    case GET_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CLEAR_USER:
      return {
        object: null,
        loading: false,
        error: null,
      };
    default:
      return state
  }
};

export default userReducer;
