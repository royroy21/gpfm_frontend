import React from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';

const styles = theme => ({
  error: {
    marginTop: theme.spacing(2),
    color: theme.palette.secondary.main,
  }
});

class NonFieldErrors extends React.Component {

  render (){
    const { classes } = this.props;
    if (!this.props.error) {
      return null;
    } else {
      const { non_field_errors: nonFieldErrors } = this.props.error;
      return (
        nonFieldErrors.map((errorMessage, index) =>
          <p key={index} className={classes.error}>{errorMessage}</p>)
      )
    }
  }
}

export default withStyles(styles)(NonFieldErrors)

NonFieldErrors.propTypes = {
  error: PropTypes.object,
};
