import {
  GET_GENRES_BEGIN,
  GET_GENRES_SUCCESS,
  GET_GENRES_ERROR,
} from './../actions/genres';

const initialState = {
  objects: null,
  loading: false,
  error: null,
};

const genresReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_GENRES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_GENRES_SUCCESS:
        return {
        ...state,
        loading: false,
        objects: action.payload.data,
      };
    case GET_GENRES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state
  }
};

export default genresReducer;
