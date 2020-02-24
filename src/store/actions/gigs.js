import {gigsURL} from "../../api/urls";
import DispatchAPI from "../../api";

// get gig
export const GET_GIG_BEGIN = 'GET_GIG_BEGIN';
export const GET_GIG_SUCCESS = 'GET_GIG_SUCCESS';
export const GET_GIG_ERROR = 'GET_GIG_ERROR';

export const getGigBegin = () => ({
  type: GET_GIG_BEGIN,
});

export const getGigSuccess = data => ({
  type: GET_GIG_SUCCESS,
  payload: { data },
});

export const getGigError = error => ({
  type: GET_GIG_ERROR,
  payload: { error },
});

// create gig
export const POST_GIG_BEGIN = 'POST_GIG_BEGIN';
export const POST_GIG_SUCCESS = 'POST_GIG_SUCCESS';
export const POST_GIG_ERROR = 'POST_GIG_ERROR';

export const postGigBegin = data => ({
  type: POST_GIG_BEGIN,
  payload: { data },
});

export const postGigSuccess = data => ({
  type: POST_GIG_SUCCESS,
  payload: { data },
});

export const postGigError = error => ({
  type: POST_GIG_ERROR,
  payload: { error },
});

export const postGig = data => new DispatchAPI().dispatchPost(
  data,
  gigsURL,
  postGigBegin,
  postGigSuccess,
  postGigError,
);

// delete gig
export const DELETE_GIG_BEGIN = 'DELETE_GIG_BEGIN';
export const DELETE_GIG_SUCCESS = 'DELETE_GIG_SUCCESS';
export const DELETE_GIG_ERROR = 'DELETE_GIG_ERROR';

export const deleteGigBegin = () => ({
  type: DELETE_GIG_BEGIN,
});

export const deleteGigSuccess = () => ({
  type: DELETE_GIG_SUCCESS,
});

export const deleteGigError = error => ({
  type: DELETE_GIG_ERROR,
  payload: { error },
});

export const deleteGig = ({id}) => new DispatchAPI().dispatchDelete(
  id,
  gigsURL,
  deleteGigBegin,
  deleteGigSuccess,
  deleteGigError,
);

// patch gig
export const PATCH_GIG_BEGIN   = 'PATCH_GIG_BEGIN';
export const PATCH_GIG_SUCCESS = 'PATCH_GIG_SUCCESS';
export const PATCH_GIG_ERROR = 'PATCH_GIG_ERROR';

export const patchGigBegin = () => ({
  type: PATCH_GIG_BEGIN,
});

export const patchGigSuccess = data => ({
  type: PATCH_GIG_SUCCESS,
  payload: { data },
});

export const patchGigError = error => ({
  type: PATCH_GIG_ERROR,
  payload: { error },
});

export const patchGig = data => new DispatchAPI().dispatchPatchWithId(
  data.id,
  data,
  gigsURL,
  patchGigBegin,
  patchGigSuccess,
  patchGigError,
);

// get gigs
export const GET_GIGS_BEGIN   = 'GET_GIGS_BEGIN';
export const GET_GIGS_SUCCESS = 'GET_GIGS_SUCCESS';
export const GET_GIGS_ERROR = 'GET_GIGS_ERROR';

export const getGigsBegin = () => ({
  type: GET_GIGS_BEGIN,
});

export const getGigsSuccess = data => ({
  type: GET_GIGS_SUCCESS,
  payload: { data },
});

export const getGigsError = error => ({
  type: GET_GIGS_ERROR,
  payload: { error },
});

export const getGigs = () => new DispatchAPI().dispatchGet(
  gigsURL,
  getGigsBegin,
  getGigsSuccess,
  getGigsError,
);
