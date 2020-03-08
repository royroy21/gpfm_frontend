import React, {Fragment} from "react";
import Avatar from "@material-ui/core/Avatar";
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
    width: "250px",
    height: "250px",
    cursor: "pointer",
  },
  small: {
    margin: "10px",
    cursor: "pointer",
  },
});

class GPAvatar extends React.Component {

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
    const { classes } = this.props;
    const src = this.props.forceBlank ? null : this.props.src;
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
        <Avatar
          onClick={this.handleClickOpen}
          alt="??"
          src={src}
          className={this.props.size  !== "small" ? classes.large : classes.small}
        />
      </Fragment>
    )
  }
}

export default withStyles(styles)(GPAvatar);

GPAvatar.propTypes = {
  forceBlank: PropTypes.bool.isRequired,
  size: PropTypes.string.isRequired,
  src: PropTypes.string,
};

GPAvatar.defaultProps = {
  forceBlank: false,
  size: "small",
  src: null,
};
