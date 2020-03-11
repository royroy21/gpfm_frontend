import axios from "axios";

class DispatchAPI {

  successfulStatusCodes = [
    200,
    201,
    204,
  ];

  constructor() {
    this.dispatchPost = this.dispatchPost.bind(this);
    this.dispatchGet = this.dispatchGet.bind(this);
    this.getAuthorizationHeaders = this.getAuthorizationHeaders.bind(this);
    this.dispatchExtraActions = this.dispatchExtraActions.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
  }

  dispatchPost(
    data,
    url,
    beginAction,
    successAction,
    errorAction,
    extraActions=null,
    ) {
    return this.dispatchWithData(
      axios.post,
      data,
      url,
      beginAction,
      successAction,
      errorAction,
      extraActions,
    );
  }

  dispatchPatch(
    data,
    url,
    beginAction,
    successAction,
    errorAction,
    extraActions=null,
    ) {
    return this.dispatchWithData(
      axios.patch,
      data,
      url,
      beginAction,
      successAction,
      errorAction,
      extraActions,
    );
  }

  dispatchPatchWithId(
    id,
    data,
    url,
    beginAction,
    successAction,
    errorAction,
    extraActions=null,
    ) {
    const urlWithId = `${url}${id}/`;
    return this.dispatchWithData(
      axios.patch,
      data,
      urlWithId,
      beginAction,
      successAction,
      errorAction,
      extraActions,
    );
  }

  dispatchWithData(
    action,
    data,
    url,
    beginAction,
    successAction,
    errorAction,
    extraActions=null,
    ) {
    return (dispatch, getState) => {
      dispatch(beginAction());
      const headers = this.getAuthorizationHeaders(getState);
      return action(url, data, headers)
        .then(response => this.handleErrors(response, this.successfulStatusCodes))
        .then(response => {
          dispatch(successAction(response.data));
          this.dispatchExtraActions(dispatch, extraActions);
          return response.data;
        })
        .catch(error => dispatch(errorAction(error.response.data)));
    }
  }

  dispatchGet(
    url,
    beginAction,
    successAction,
    errorAction,
    extraActions=null,
    params={},
    ) {
    return this.dispatchWithoutData(
      axios.get,
      url,
      beginAction,
      successAction,
      errorAction,
      extraActions,
      params,
    );
  }

  dispatchGetWithId(
    id,
    url,
    beginAction,
    successAction,
    errorAction,
    extraActions=null,
    params={},
    ) {
    const urlWithId = `${url}${id}/`;
    return this.dispatchWithoutData(
      axios.get,
      urlWithId,
      beginAction,
      successAction,
      errorAction,
      extraActions,
      params,
    );
  }

  dispatchDelete(
    id,
    url,
    beginAction,
    successAction,
    errorAction,
    extraActions=null,
    ) {
    const urlWithId = `${url}${id}/`;

    console.log("xxxx 1 => ", urlWithId, extraActions);

    return this.dispatchWithoutData(
      axios.delete,
      urlWithId,
      beginAction,
      successAction,
      errorAction,
      extraActions,
    );
  }

  dispatchWithoutData(
    action,
    url,
    beginAction,
    successAction,
    errorAction,
    extraActions=null,
    params={},
    ) {

    console.log("xxxx 2 => ", url, extraActions);

    return (dispatch, getState) => {
      dispatch(beginAction());
      const headersAndParams = {
        params,
        ...this.getAuthorizationHeaders(getState)
      };
      return action(url, headersAndParams)
        .then(response => this.handleErrors(response, this.successfulStatusCodes))
        .then(response => {
          dispatch(successAction(response.data));
          this.dispatchExtraActions(dispatch, extraActions);
          if (response.data) {
            return response.data;
          } else {
            return response
          }
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
