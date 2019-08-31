import { genresURL } from "../../api/urls";
import DispatchAPI from "../../api";

export const GET_GENRES_BEGIN   = 'GET_GENRES_BEGIN';
export const GET_GENRES_SUCCESS = 'GET_GENRES_SUCCESS';
export const GET_GENRES_ERROR = 'GET_GENRES_ERROR';

export const getGenresBegin = () => ({
  type: GET_GENRES_BEGIN,
});

export const getGenresSuccess = data => ({
  type: GET_GENRES_SUCCESS,
  payload: { data },
});

export const getGenresError = error => ({
  type: GET_GENRES_ERROR,
  payload: { error },
});

export const getGenres = () => new DispatchAPI().dispatchGet(
  genresURL,
  getGenresBegin,
  getGenresSuccess,
  getGenresError,
);
