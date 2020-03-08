import React from "react";
import Slide from "@material-ui/core/Slide";

class Dialog extends React.Component {

  Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  render() {
    return (
      <Dialog TransitionComponent={this.Transition}>
        {this.props.content}
      </Dialog>
    )
  }

}

export default Dialog;
