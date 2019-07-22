import React, {Fragment} from 'react';
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
    return (
      <Fragment>
      {this.props.error ? (
        <p className={classes.error}>{this.props.error.non_field_errors}</p>
        ) : (
          null
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(NonFieldErrors)

NonFieldErrors.propTypes = {
  error: PropTypes.object,
};
