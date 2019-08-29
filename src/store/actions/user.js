import {userDetailsURL} from "../../api/urls";
import DispatchAPI from "../../api";

export const GET_USER_BEGIN   = 'GET_USER_BEGIN';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';
export const CLEAR_USER = 'CLEAR_USER';

export const getUserBegin = () => ({
  type: GET_USER_BEGIN,
});

export const getUserSuccess = data => ({
  type: GET_USER_SUCCESS,
  payload: { data },
});

export const getUserError = error => ({
  type: GET_USER_ERROR,
  payload: { error },
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const getUser = () => new DispatchAPI().dispatchGet(
  userDetailsURL,
  getUserBegin,
  getUserSuccess,
  getUserError,
);

export const patchUser = (data) => new DispatchAPI().dispatchPatch(
  data,
  userDetailsURL,
  getUserBegin,
  getUserSuccess,
  getUserError,
);
