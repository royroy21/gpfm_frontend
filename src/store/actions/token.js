import {createPost} from "../../api/post";
import {tokenLoginURL} from "../../api/urls";
import {getUser} from "./user";

export const POST_TOKEN_BEGIN   = 'POST_TOKEN_BEGIN';
export const POST_TOKEN_SUCCESS = 'POST_TOKEN_SUCCESS';
export const POST_TOKEN_ERROR = 'POST_TOKEN_ERROR';

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

export const postToken = (data) => createPost(
  data,
  tokenLoginURL,
  postTokenBegin,
  postTokenSuccess,
  postTokenError,
  [getUser]
);
