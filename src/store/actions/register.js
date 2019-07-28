import {userURL} from "../../api/urls";
import DispatchAPI from "../../api";
import {postToken} from "./token";

export const POST_REGISTER_BEGIN   = 'POST_REGISTER_BEGIN';
export const POST_REGISTER_SUCCESS = 'POST_REGISTER_SUCCESS';
export const POST_REGISTER_ERROR = 'POST_REGISTER_ERROR';

export const postRegisterBegin = () => ({
  type: POST_REGISTER_BEGIN,
});

export const postRegisterSuccess = data => ({
  type: POST_REGISTER_SUCCESS,
  payload: { data }
});

export const postRegisterError = error => ({
  type: POST_REGISTER_ERROR,
  payload: { error }
});

export const postRegister = (data) => new DispatchAPI().dispatchPost(
  data,
  userURL,
  postRegisterBegin,
  postRegisterSuccess,
  postRegisterError,
  [() => postToken(data)]
);
