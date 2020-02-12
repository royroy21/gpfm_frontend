import { connect } from 'react-redux'
import {getGenres} from "../../store/actions/genres";


const mapStateToProps = (state) => {
  return {
    store: {
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
    }
  }
};

const GigsWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default GigsWrapper;
