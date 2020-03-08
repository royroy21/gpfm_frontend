import { connect } from 'react-redux'
import {getGenres} from "../../store/actions/genres";
import {CLEAR_GIG, getGigs, deleteGig, postGig} from "../../store/actions/gigs";

const mapStateToProps = (state) => {
  return {
    store: {
      gig: state.gig,
      gigs: state.gigs,
      genres: state.genres,
      user: state.user,
    },
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      getGenres: () => {
        dispatch(getGenres());
      },
      getGigs: (params) => {
        dispatch(getGigs(params));
      },
      postGig: (data) => {
        dispatch(postGig(data))
      },
      clearGig: () => {
        dispatch({type: CLEAR_GIG});
      },
      deleteGig: (id) => {
        dispatch(deleteGig(id))
      },
    }
  }
};

const GigsWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default GigsWrapper;
