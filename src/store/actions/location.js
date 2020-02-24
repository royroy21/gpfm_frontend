import {locationsURL} from "../../api/urls";
import DispatchAPI from "../../api";

export const CLEAR_LOCATION = 'CLEAR_LOCATION';

// get location
export const GET_LOCATION_BEGIN = 'GET_LOCATION_BEGIN';
export const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS';
export const GET_LOCATION_ERROR = 'GET_LOCATION_ERROR';

export const getLocationBegin = () => ({
  type: GET_LOCATION_BEGIN,
});

// create location
export const POST_LOCATION_BEGIN = 'POST_LOCATION_BEGIN';
export const POST_LOCATION_SUCCESS = 'POST_LOCATION_SUCCESS';
export const POST_LOCATION_ERROR = 'POST_LOCATION_ERROR';

export const postLocationBegin = data => ({
  type: POST_LOCATION_BEGIN,
  payload: { data },
});

export const postLocationSuccess = data => ({
  type: POST_LOCATION_SUCCESS,
  payload: { data },
});

export const postLocationError = error => ({
  type: POST_LOCATION_ERROR,
  payload: { error },
});

export const postLocation = data => new DispatchAPI().dispatchPost(
  data,
  locationsURL,
  postLocationBegin,
  postLocationSuccess,
  postLocationError,
);
