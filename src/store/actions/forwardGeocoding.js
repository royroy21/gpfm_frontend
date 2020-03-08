import { forwardGeocodingURL } from "../../api/urls";
import DispatchAPI from "../../api";

export const CLEAR_FORWARD_GEOCODING = 'CLEAR_FORWARD_GEOCODING';

export const GET_FORWARD_GEOCODING_BEGIN = 'GET_FORWARD_GEOCODING_BEGIN';
export const GET_FORWARD_GEOCODING_SUCCESS = 'GET_FORWARD_GEOCODING_SUCCESS';
export const GET_FORWARD_GEOCODING_ERROR = 'GET_FORWARD_GEOCODING_ERROR';

export const getForwardGeocodingBegin = () => ({
  type: GET_FORWARD_GEOCODING_BEGIN,
});

export const getForwardGeocodingSuccess = data => ({
  type: GET_FORWARD_GEOCODING_SUCCESS,
  payload: { data },
});

export const getForwardGeocodingError = error => ({
  type: GET_FORWARD_GEOCODING_ERROR,
  payload: { error },
});

export const getForwardGeocoding = (params) => new DispatchAPI().dispatchGet(
  forwardGeocodingURL,
  getForwardGeocodingBegin,
  getForwardGeocodingSuccess,
  getForwardGeocodingError,
  null,
  params,
);
