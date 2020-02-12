import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
  error: {
    fontSize: "0.9em",
    color: theme.palette.secondary.main,
  }
});

class Field extends React.Component {

  renderError() {
    const { classes, error, name } = this.props;

    if (!error) {
      return null
    }
    const errors = error[name] || [];
    return errors.map((errorMessage, index) =>
      <p key={index} className={classes.error}>{errorMessage}</p>)
  }

  render (){
    const { Field, error, ...rest } = this.props;
    return (
      <Fragment>
        <Field {...rest} />
        {this.renderError()}
      </Fragment>
    )
  }

}

Field.propTypes = {
  field: PropTypes.node.isRequired,
  error: PropTypes.object.isRequired,
};

export default withStyles(styles)(Field);
