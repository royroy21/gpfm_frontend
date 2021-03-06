import {tokenLoginURL} from "../../api/urls";
import {getUser} from "./user";
import DispatchAPI from "../../api";

export const POST_TOKEN_BEGIN   = 'POST_TOKEN_BEGIN';
export const POST_TOKEN_SUCCESS = 'POST_TOKEN_SUCCESS';
export const POST_TOKEN_ERROR = 'POST_TOKEN_ERROR';
export const CLEAR_TOKEN = 'CLEAR_TOKEN';

export const postTokenBegin = data => ({
  type: POST_TOKEN_BEGIN,
  payload: { data },
});

export const postTokenSuccess = data => ({
  type: POST_TOKEN_SUCCESS,
  payload: { data }
});

export const postTokenError = error => ({
  type: POST_TOKEN_ERROR,
  payload: { error }
});

export const clearToken = () => ({
  type: CLEAR_TOKEN,
});

export const postToken = (data) => new DispatchAPI().dispatchPost(
  data,
  tokenLoginURL,
  postTokenBegin,
  postTokenSuccess,
  postTokenError,
  [getUser]
);
