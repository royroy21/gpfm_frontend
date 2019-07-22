import {
  GET_USER_BEGIN,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from './../actions/user';

const initialState = {
  user: null,
  loading: false,
  error: null
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
        user: action.payload.data,
      };
    case GET_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        user: null,
      };
    default:
      return state
  }
};

export default userReducer;
