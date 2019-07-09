import axios from 'axios';

export const POST_LOGIN_BEGIN   = 'POST_LOGIN_BEGIN';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_ERROR = 'POST_LOGIN_ERROR';

export const postLoginBegin = data => ({
  type: POST_LOGIN_BEGIN,
  payload: { data },
});

export const postLoginSuccess = data => ({
  type: POST_LOGIN_SUCCESS,
  payload: { data }
});

export const postLoginError = error => ({
  type: POST_LOGIN_ERROR,
  payload: { error }
});

export function postLogin(data) {
  return dispatch => {
    dispatch(postLoginBegin(data));
    return axios.post("http://localhost:8000/auth/token/login/", data)
      .then(handleErrors)
      .then(response => {
        dispatch(postLoginSuccess(response.data));
        return response.data;
      })
      .catch(error => dispatch(postLoginError(error.response.data)));
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
