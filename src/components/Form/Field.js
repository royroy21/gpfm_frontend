import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Error from "./Error";

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
  Field: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),
  error: PropTypes.object,
};

export default Field;
