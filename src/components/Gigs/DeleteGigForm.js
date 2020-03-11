import React, {Fragment} from "react";
import {withStyles} from "@material-ui/core";
import Form from "../Form";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  container: {
    padding: theme.spacing(5),
  },
  buttons: {
    flex: "row",
    textAlign: "center",
  },
  message: {
    textAlign: "center",
  },
});

class DeleteGigForm extends Form {

  MESSAGE = "Are you sure you want to delete this?";
  CONFIRM_BUTTON_TEXT = "YES";
  REJECT_BUTTON_TEXT = "CANCEL";

  getFields() {
    const {
      classes,
      handleClose,
    } = this.props;

    console.log("DeleteGigForm props: ", this.props);

    return (
      <div className={classes.container}>
        <p>{this.MESSAGE}</p>
        <div className={classes.buttons}>
          <Button
            color={"secondary"}
            onClick={() => this.props.actions.deleteGig(this.props.id)}
          >
            {this.CONFIRM_BUTTON_TEXT}
          </Button>
          <Button
            color={"secondary"}
            onClick={handleClose}
          >
            {this.REJECT_BUTTON_TEXT}
          </Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(DeleteGigForm);
