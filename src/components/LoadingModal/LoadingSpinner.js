import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import {withStyles} from "@material-ui/core";

const styles = () => ({
  progressContainer: {
    position: "relative",
    height: "100%"
  },
  progress: {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    margin: "auto",
    height: "50px",
  },
});

class LoadingSpinner extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.progressContainer}>
        <CircularProgress className={classes.progress} color="secondary" />
      </div>
    )
  }

}

export default withStyles(styles)(LoadingSpinner);
