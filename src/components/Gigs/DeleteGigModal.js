import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import CustomDialog from "../CustomDialog";
import DeleteGigForm from "./DeleteGigForm";

const styles = theme => ({
});

class DeleteGigModal extends Component {

  render() {
    return (
      <CustomDialog
        open={this.props.open}
        handleClose={this.props.handleClose}
        content={
          <DeleteGigForm
            {...this.props.deleteGigProps}
            handleClose={this.props.handleClose}
          />
        }
      />
    )
  }
}

export default withStyles(styles)(DeleteGigModal);

DeleteGigModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  deleteGigProps: PropTypes.object.isRequired,
};
