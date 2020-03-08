import { connect } from 'react-redux'
import {getCountries} from "../../store/actions/countries";
import {CLEAR_LOCATION, postLocation} from "../../store/actions/location";

import {
  CLEAR_FORWARD_GEOCODING,
  getForwardGeocoding,
} from "../../store/actions/forwardGeocoding";

const mapStateToProps = (state) => {
  return {
    store: {
      countries: state.countries,
      forwardGeocoding: state.forwardGeocoding,
      location: state.location,
    },
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      clearForwardGeocoding: () => {
        dispatch({type: CLEAR_FORWARD_GEOCODING});
      },
      getCountries: () => {
        dispatch(getCountries())
      },
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
