import { ipapiURL } from "../../api/urls";
import DispatchAPI from "../../api";

export const GET_IPAPI_BEGIN   = 'GET_IPAPI_BEGIN';
export const GET_IPAPI_SUCCESS = 'GET_IPAPI_SUCCESS';
export const GET_IPAPI_ERROR = 'GET_IPAPI_ERROR';

export const getIPAPIBegin = () => ({
  type: GET_IPAPI_BEGIN,
});

export const getIPAPISuccess = data => ({
  type: GET_IPAPI_SUCCESS,
  payload: { data },
});

export const getIPAPIError = error => ({
  type: GET_IPAPI_ERROR,
  payload: { error },
});

export const getIPAPI = () => new DispatchAPI().dispatchGet(
  ipapiURL,
  getIPAPIBegin,
  getIPAPISuccess,
  getIPAPIError,
);
