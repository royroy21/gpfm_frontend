import { connect } from 'react-redux'

import {getForwardGeocoding} from "../../store/actions/forwardGeocoding";

const mapStateToProps = (state) => {
  return {
    store: {
      forwardGeocoding: state.forwardGeocoding,
    },
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      getForwardGeocoding: (params) => {
        dispatch(getForwardGeocoding(params))
      },
    }
  }
};

const ForwardGeocodingWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default ForwardGeocodingWrapper
