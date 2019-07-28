import React from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const styles = theme => ({
  progressContainer: {
    position: "relative",
    height: "100%",
    textAlign: "center",
  },
  notification: {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    margin: "auto",
    height: "50px",
    textAlign: "center",
    color: theme.palette.secondary.main,
  },
  table: {
    margin: "auto",
  },
});

class SuccessNotification extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.progressContainer}>
        <div className={classes.notification}>
          <table className={classes.table}>
            <tr>
              <th><h4>{this.props.successMessage}</h4></th>
              <th><ThumbUpIcon /></th>
            </tr>
          </table>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(SuccessNotification);

SuccessNotification.propTypes = {
  successMessage: PropTypes.string.isRequired,
};

SuccessNotification.defaultProps = {
  successMessage: "Success",
};
