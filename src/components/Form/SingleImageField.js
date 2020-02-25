import React, {Fragment} from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {
  CloudUpload,
  Clear,
  Sync,
} from '@material-ui/icons';
import {withStyles} from "@material-ui/core";
import Image from "../SingleImage/Image";
import PropTypes from "prop-types";
import Error from "./Error";

const styles = theme => ({
  rightIcon: {
    marginLeft: "10px",
  },
});

class SingleImageField extends React.Component {

  imageInput = React.createRef();

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { src } = this.props;
    if (!src) {
      this.imageInput.value = null;
    }
  }

  render() {
    const { classes, src } = this.props;
    const imageSrc = src ? URL.createObjectURL(src) : null;
    return (
      <Fragment>
        <Image
          size={"large"}
          src={imageSrc}
        />
        <Error
          name={"image"}
          error={this.props.error}
        />
        <input
          style={{display: "none"}}
          type={"file"}
          onChange={this.props.handleAddImage}
          ref={imageInput => this.imageInput = imageInput}
        />
        {imageSrc ? (
          <ButtonGroup aria-label="outlined primary button group" >
            <Button
              style={{width: "100%"}}
              onClick={() => this.imageInput.click()}
            >{"Change"}
            <Sync className={classes.rightIcon} />
            </Button>
            <Button
              style={{width: "100%"}}
              onClick={this.props.handleRemoveImage}
            >{"Remove"}
            <Clear className={classes.rightIcon} />
            </Button>
          </ButtonGroup>
        ) : (
          <Button
            variant={"outlined"}
            onClick={() => this.imageInput.click()}
          >{"Add Image"}
            <CloudUpload className={classes.rightIcon} />
          </Button>
        )}
      </Fragment>
    )
  }
}

export default withStyles(styles)(SingleImageField);

SingleImageField.propTypes = {
  src: PropTypes.object,
  error: PropTypes.object,
  handleAddImage: PropTypes.func.isRequired,
  handleRemoveImage: PropTypes.func.isRequired,
};
