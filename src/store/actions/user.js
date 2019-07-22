import {createGet} from "../../api/get";
import {userDetailsURL} from "../../api/urls";

export const GET_USER_BEGIN   = 'GET_USER_BEGIN';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const getUserBegin = () => ({
  type: GET_USER_BEGIN,
});

export const getUserSuccess = data => ({
  type: GET_USER_SUCCESS,
  payload: { data }
});

export const getUserError = error => ({
  type: GET_USER_ERROR,
  payload: { error }
});

export const getUser = () => createGet(
  userDetailsURL,
  getUserBegin,
  getUserSuccess,
  getUserError,
);
