import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    store: {
      user: state.user,
    },
  }
};

const GPAppBarWrapper = connect(
  mapStateToProps,
);

export default GPAppBarWrapper
