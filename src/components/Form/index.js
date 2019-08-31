import React, {Fragment} from 'react';
import Errors from "../Errors";
import LoadingModal from "../LoadingModal";
import FormGroup from "@material-ui/core/FormGroup";
import PropTypes from "prop-types";
import GPButton from "../GPButton";

class Form extends React.Component {

  state = {
    formData: {
    },
  };

  formData = new FormData();

  handleSubmit = (event) => {
    throw Error("handleSubmit method not implemented");
  };

  handleChange = (event) => {
    const formData = {
      ...this.state.formData,
      [event.target.name]: event.target.value,
    };
    this.setState({formData});
    this.formData.append(event.target.name, event.target.value);
  };

  handleChangeFile = (event, fieldName) => {
    const formData = {
      ...this.state.formData,
      [fieldName]: event.target.files[0],
    };
    this.setState({formData});
    this.formData.append(fieldName, event.target.files[0]);
  };

  getFields() {
    throw Error("getFields method not implemented");
  }

  render (){
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            {this.getFields()}
            <GPButton type="submit">
              {this.props.buttonLabel}
            </GPButton>
            <Errors error={this.props.errors}/>
            <LoadingModal
              loading={!!this.props.loading}
              error={!!this.props.error}
              successMessage={this.props.successMessage}
              withSuccess
            />
          </FormGroup>
        </form>
      </Fragment>
    )
  }
}

export default Form;

Form.propTypes = {
  error: PropTypes.bool.isRequired,
  errors: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  successMessage: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};
