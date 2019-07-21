import axios from "axios";
import {handleErrors} from "./handleErrors";

const successfulStatusCodes = [
  200,
  201,
];

export const createPost = (data, url, beginAction, successAction, errorAction) => {
  return dispatch => {
    dispatch(beginAction(data));
    return axios.post(url, data)
      .then(response => handleErrors(response, successfulStatusCodes))
      .then(response => {
        dispatch(successAction(response.data));
        return response.data;
      })
      .catch(error => dispatch(errorAction(error.response.data)));
  };
};
