import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const styles = theme => ({
  large: {
    margin: "10px auto 5px auto",
    borderRadius: "10px",
    width: "100%",
  },
  small: {
    margin: "10px",
    borderRadius: "10px",
    width: "50%",
  },
});

class Image extends React.Component {

  render() {
    const { classes, src } = this.props;
    if (!src){
      return null
    }
    return (
      <img
        alt="??"
        src={src}
        className={this.props.size  !== "small" ? classes.large : classes.small}
      />
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
