import axios from "axios";

class DispatchAPI {
  successfulStatusCodes = [200, 201];

  constructor() {
    this.dispatchPost = this.dispatchPost.bind(this);
    this.dispatchGet = this.dispatchGet.bind(this);
    this.getAuthorizationHeaders = this.getAuthorizationHeaders.bind(this);
    this.dispatchExtraActions = this.dispatchExtraActions.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
  }

  dispatchPost(data, url, beginAction, successAction, errorAction, extraActions=null) {
    return (dispatch, getState) => {
      dispatch(beginAction());
      const headers = this.getAuthorizationHeaders(getState);
      return axios.post(url, data, headers)
        .then(response => this.handleErrors(response, this.successfulStatusCodes))
        .then(response => {
          dispatch(successAction(response.data));
          this.dispatchExtraActions(dispatch, extraActions);
          return response.data;
        })
        .catch(error => dispatch(errorAction(error.response.data)));
    }
  }

  dispatchGet(url, beginAction, successAction, errorAction, extraActions=null) {
    return (dispatch, getState) => {
      dispatch(beginAction());
      const headers = this.getAuthorizationHeaders(getState);
      return axios.get(url, headers)
        .then(response => this.handleErrors(response, this.successfulStatusCodes))
        .then(response => {
          dispatch(successAction(response.data));
          this.dispatchExtraActions(dispatch, extraActions);
          return response.data;
        })
        .catch(error => dispatch(errorAction(error.response.data)));
    }
  }

  getAuthorizationHeaders(getState) {
    const {object: authToken} = getState().token;
    return authToken ? {headers: {Authorization: `Token ${authToken.auth_token}`}} : null;
  }

  dispatchExtraActions(dispatch, extraActions) {
    if (extraActions) {
      extraActions.forEach(action => {dispatch(action())})
    }
  }

  handleErrors(response, successfulStatusCodes) {
    if (!successfulStatusCodes.includes(response.status)) {
      throw Error(response.data);
    }
    return response;
  }
}

export default DispatchAPI;
