import axios from "axios";
import {handleErrors} from "./handleErrors";

const successfulStatusCodes = [
  200,
];

export const createGet = (url, beginAction, successAction, errorAction) => {
  return (dispatch, getState) => {
    dispatch(beginAction());

    const authToken = getState().token.auth_token;
    const headers = authToken ? {headers: {Authorization: `Token ${authToken}`}} : null;

    return axios.get(url, headers)
      .then(response => handleErrors(response, successfulStatusCodes))
      .then(response => {
        dispatch(successAction(response.data));
        return response.data;
      })
      .catch(error => dispatch(errorAction(error.response.data)));
  };
};
