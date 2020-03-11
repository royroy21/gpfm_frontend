import React from "react";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";

class CustomDialog extends React.Component {

  Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  render() {

    console.log("hits 2", this.props);

    return (
      <Dialog
        open={this.props.open}
        handleClose={this.props.handleClose}
        TransitionComponent={this.Transition}
      >
        {this.props.content}
      </Dialog>
    )
  }

}

export default CustomDialog;

CustomDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  content: PropTypes.object.isRequired,
};
