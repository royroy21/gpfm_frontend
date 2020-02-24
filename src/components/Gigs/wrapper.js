import { connect } from 'react-redux'
import {getGenres} from "../../store/actions/genres";
import {postGig} from "../../store/actions/gigs";

const mapStateToProps = (state) => {
  return {
    store: {
      gig: state.gig,
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
      postGig: (data) => {
        dispatch(postGig(data))
      },
    }
  }
};

const GigsWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default GigsWrapper;
