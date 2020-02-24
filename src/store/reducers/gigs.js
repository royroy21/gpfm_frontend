import {
  GET_GIG_BEGIN,
  GET_GIG_SUCCESS,
  GET_GIG_ERROR,
  POST_GIG_BEGIN,
  POST_GIG_SUCCESS,
  POST_GIG_ERROR,
  DELETE_GIG_BEGIN,
  DELETE_GIG_SUCCESS,
  DELETE_GIG_ERROR,
  PATCH_GIG_BEGIN,
  PATCH_GIG_SUCCESS,
  PATCH_GIG_ERROR,
  GET_GIGS_BEGIN,
  GET_GIGS_SUCCESS,
  GET_GIGS_ERROR,
} from './../actions/gigs';

const initialGigState = {
  object: null,
  loading: false,
  error: null,
};

export const gigReducer = (state = initialGigState, action) => {
  switch(action.type) {
    case GET_GIG_BEGIN:
    case POST_GIG_BEGIN:
    case DELETE_GIG_BEGIN:
    case PATCH_GIG_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_GIG_SUCCESS:
    case POST_GIG_SUCCESS:
    case PATCH_GIG_SUCCESS:
      return {
        object: action.payload.data,
        loading: false,
        error: null,
      };
    case GET_GIG_ERROR:
    case POST_GIG_ERROR:
    case DELETE_GIG_ERROR:
    case PATCH_GIG_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case DELETE_GIG_SUCCESS:
      return {
        object: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

const initialGigsState = {
  object: null,
  loading: false,
  error: null,
};

export const gigsReducer = (state = initialGigsState, action) => {
  switch(action.type) {
    case GET_GIGS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_GIGS_SUCCESS:
      return {
        ...state,
        object: action.payload.data,
      };
    case GET_GIGS_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
