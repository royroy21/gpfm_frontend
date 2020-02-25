import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Error from "./Error";

const styles = theme => ({
  error: {
    fontSize: "0.9em",
    color: theme.palette.secondary.main,
  }
});

class Field extends React.Component {

  render (){
    const { Field, error, ...rest } = this.props;
    return (
      <Fragment>
        <Field {...rest} />
        <Error
          name={this.props.name}
          error={error}
        />
      </Fragment>
    )
  }

}

Field.propTypes = {
  field: PropTypes.node.isRequired,
  error: PropTypes.object.isRequired,
};

export default withStyles(styles)(Field);
