import React, {Fragment} from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

const styles = theme => ({
  fullImage: {
    width: "90%",
    height: "90%",
    backgroundColor: "black",
    margin: "auto",
  },
  large: {
    margin: "10px auto 5px auto",
    borderRadius: "10px",
    width: "100%",
    cursor: "pointer",
  },
  small: {
    margin: "10px",
    borderRadius: "50px",
    height: "100px",
    width: "100px",
    cursor: "pointer",
  },
  largeBlank: {
    backgroundColor: "#5C5C5C",
    margin: "10px auto 5px auto",
    width: "100%",
  },
  smallBlank: {
    backgroundColor: "#5C5C5C",
    margin: "10px",
    height: "100px",
    minWidth: "100px",
  },
});

class Image extends React.Component {

  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  render() {
    const { classes, src } = this.props;
    if (!src){
      return (
        <div
          className={this.props.size  !== "small" ? classes.largeBlank : classes.smallBlank}
        >{""}</div>
      )
    }
    return (
      <Fragment>
        {this.state.open ? (
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={this.Transition}
          >
            <img
              alt="??"
              className={classes.fullImage}
              src={src}
              onClick={this.handleClose}
            />
          </Dialog>
          ) : null}
          <img
            onClick={this.handleClickOpen}
            alt="??"
            src={src}
            className={this.props.size  !== "small" ? classes.large : classes.small}
          />
      </Fragment>
    )
  }
}

export default withStyles(styles)(Image);

Image.propTypes = {
  size: PropTypes.string.isRequired,
  src: PropTypes.string,
};

Image.defaultProps = {
  forceBlank: false,
  size: "small",
  src: null,
};
