import axios from 'axios';

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

export function postToken(data) {
  return dispatch => {
    dispatch(postTokenBegin(data));
    return axios.post("http://localhost:8000/auth/token/login/", data)
      .then(handleErrors)
      .then(response => {
        dispatch(postTokenSuccess(response.data));
        return response.data;
      })
      .catch(error => dispatch(postTokenError(error.response.data)));
  };
}

function handleErrors(response) {
  const successfulStatusCodes = [
    200,
    201,
  ];

  if (!successfulStatusCodes.includes(response.status)) {
    throw Error(response.data);
  }
  return response;
}
