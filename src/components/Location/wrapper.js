import { connect } from 'react-redux'
import {CLEAR_LOCATION, postLocation} from "../../store/actions/location";

import {getForwardGeocoding} from "../../store/actions/forwardGeocoding";

const mapStateToProps = (state) => {
  return {
    store: {
      forwardGeocoding: state.forwardGeocoding,
      location: state.location,
    },
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      getForwardGeocoding: (params) => {
        dispatch(getForwardGeocoding(params))
      },
      postLocation: (data) => {
        dispatch(postLocation(data))
      },
      clearLocation: () => {
        dispatch({type: CLEAR_LOCATION});
      },
    }
  }
};

const ForwardGeocodingWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default ForwardGeocodingWrapper
