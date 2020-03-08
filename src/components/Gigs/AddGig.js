import React, {Fragment} from "react";
import LocationPickerForm from "../Location/LocationPickerForm";
import AddGigForm from "./AddGigForm";
import PropTypes from "prop-types";

class AddGig extends React.Component {

  state = {
    location: null,
  };

  getLocationField = (location) => {
    this.setState({location})
  };

  render() {
    const errors = this.props.addGigFormProps.errors
      ? this.props.addGigFormProps.errors : {};
    const locationErrors =  errors.location;
    return (
      <Fragment>
        <LocationPickerForm
          successMessage={""}
          updateLocationField={this.getLocationField}
          withMaxWidthLimit={true}
          extraErrors={locationErrors}
        />
        <AddGigForm
          {...this.props.addGigFormProps}
          location={this.state.location}
        />
      </Fragment>
    )
  }
}

export default AddGig;

AddGig.propTypes = {
  addGigFormProps: PropTypes.object.isRequired,
};
