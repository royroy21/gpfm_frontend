// TODO move to settings file
const baseURL = "http://localhost:8000";

// backend API
export const genresURL = `${baseURL}/api/genres/`;
export const tokenLoginURL = `${baseURL}/auth/token/login/`;
export const userDetailsURL = `${baseURL}/auth/users/me/`;
export const userURL = `${baseURL}/auth/users/`;

// ipapi. If we ever go over 1000 calls a day see https://ipapi.co/#pricing
export const ipapiURL = 'https://ipapi.co/json/';
