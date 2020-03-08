// TODO move to settings file
const baseURL = "http://localhost:8000";

// backend API
export const countriesURL = `${baseURL}/api/countries/`;
export const genresURL = `${baseURL}/api/genres/`;
export const gigsURL = `${baseURL}/api/gigs/`;
export const locationsURL = `${baseURL}/api/locations/`;
export const tokenLoginURL = `${baseURL}/auth/token/login/`;
export const userDetailsURL = `${baseURL}/auth/users/me/`;
export const userURL = `${baseURL}/auth/users/`;
export const forwardGeocodingURL = `${baseURL}/api/locations/geocoding/forward-query/`;

// ipapi. If we ever go over 1000 calls a day see https://ipapi.co/#pricing
export const ipapiURL = 'https://ipapi.co/json/';
