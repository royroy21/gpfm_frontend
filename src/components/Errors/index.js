import React from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';

const styles = theme => ({
  error: {
    margin: "10px 0 0 0",
    padding: "0",
    color: theme.palette.secondary.main,
  }
});

class Errors extends React.Component {

  nonVisibleFields = [
    "non_field_errors"
  ];

  formatError(field, message) {
    if (this.nonVisibleFields.includes(field)) {
      return message
    }

    const fieldAsList = field.split("_");
    const capitalisedFieldAsList = fieldAsList
      .map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return `${capitalisedFieldAsList.join(" ")}: ${message}`
  }

  getFormattedErrors(errors) {
    if (!errors) {
      return null;
    }

    const formattedErrors = [].concat(...Object.keys(errors)
      .map(key => errors[key]
        .map(message => this.formatError(key, message))));

    const { classes } = this.props;
    return (
      formattedErrors.map((error, index) => (
        <p key={index} className={classes.error}>{error}</p>
      ))
    );
  }

  render (){
    return this.getFormattedErrors(this.props.error)
  }
}

export default withStyles(styles)(Errors)

Errors.propTypes = {
  error: PropTypes.object,
};
