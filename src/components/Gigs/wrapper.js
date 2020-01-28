import { connect } from 'react-redux'


const mapStateToProps = (state) => {
  return {
    store: {
      user: state.user,
    },
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {

    }
  }
};

const GigsWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default GigsWrapper;
