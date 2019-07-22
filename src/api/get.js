import axios from "axios";
import {handleErrors} from "./handleErrors";

const successfulStatusCodes = [
  200,
];

export const createGet = (url, beginAction, successAction, errorAction) => {
  return (dispatch, getState) => {
    dispatch(beginAction());

    const {object: authToken} = getState().token;
    const headers = authToken ? {headers: {Authorization: `Token ${authToken.auth_token}`}} : null;

    return axios.get(url, headers)
      .then(response => handleErrors(response, successfulStatusCodes))
      .then(response => {
        dispatch(successAction(response.data));
        return response.data;
      })
      .catch(error => dispatch(errorAction(error.response.data)));
  };
};
