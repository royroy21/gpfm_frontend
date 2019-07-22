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

    const {object: authToken} = getState().token;
    const headers = authToken ? {headers: {Authorization: `Token ${authToken.auth_token}`}} : null;

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
