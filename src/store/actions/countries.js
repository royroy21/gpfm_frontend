import { countriesURL } from "../../api/urls";
import DispatchAPI from "../../api";

export const GET_COUNTRIES_BEGIN   = 'GET_COUNTRIES_BEGIN';
export const GET_COUNTRIES_SUCCESS = 'GET_COUNTRIES_SUCCESS';
export const GET_COUNTRIES_ERROR = 'GET_COUNTRIES_ERROR';

export const getCountriesBegin = () => ({
  type: GET_COUNTRIES_BEGIN,
});

export const getCountriesSuccess = data => ({
  type: GET_COUNTRIES_SUCCESS,
  payload: { data },
});

export const getCountriesError = error => ({
  type: GET_COUNTRIES_ERROR,
  payload: { error },
});

export const getCountries = () => new DispatchAPI().dispatchGet(
  countriesURL,
  getCountriesBegin,
  getCountriesSuccess,
  getCountriesError,
);
