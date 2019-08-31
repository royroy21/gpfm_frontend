import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const styles = theme => ({
  large: {
    margin: "10px auto 5px auto",
    width: "250px",
    height: "250px",
  },
  small: {
    margin: "10px",
  },
});

class GPAvatar extends React.Component {

  render() {
    const { classes } = this.props;
    const src = this.props.forceBlank ? null : this.props.src;
    return (
      <Avatar
        alt="??"
        src={src}
        className={this.props.size  !== "small" ? classes.large : classes.small}
      />
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
