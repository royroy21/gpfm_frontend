import React from "react";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

const styles = theme => ({
  error: {
    fontSize: "0.9em",
    color: theme.palette.secondary.main,
  }
});

class Error extends React.Component {

  render() {
    const {
      classes,
      error,
      name,
    } = this.props;

    if (!error) {
      return null
    }

    const errors = error[name] || [];
    return errors.map((errorMessage, index) =>
      <p key={index} className={classes.error}>{errorMessage}</p>)
  }

}

Error.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.object.isRequired,
};

export default withStyles(styles)(Error);
