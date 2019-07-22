import axios from "axios";
import {handleErrors} from "./handleErrors";

const successfulStatusCodes = [
  200,
  201,
];

export const createPost = (
    data, url, beginAction, successAction, errorAction, extraActions=null) => {
  return (dispatch, getState) => {
    dispatch(beginAction(data));

    const authToken = getState().token.auth_token;
    const headers = authToken ? {Authorization: `Token ${authToken}`} : null;

    return axios.post(url, data, headers)
      .then(response => handleErrors(response, successfulStatusCodes))
      .then(response => {
        dispatch(successAction(response.data));
        if (extraActions) {
          extraActions.forEach(action => {dispatch(action())})
        }
        return response.data;
      })
      .catch(error => dispatch(errorAction(error.response.data)));
  };
};
