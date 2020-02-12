import React, {Fragment} from 'react';
import Errors from "../Errors";
import LoadingModal from "../LoadingModal";
import FormGroup from "@material-ui/core/FormGroup";
import PropTypes from "prop-types";
import FormButton from "../Form/FormButton";

class Form extends React.Component {

  maxWidth = "500px";

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

  render(){
    const maxWidth = this.props.withMaxWidthLimit ? this.maxWidth: undefined;

    return (
      <div style={{"maxWidth": maxWidth}}>
        <form onSubmit={this.handleSubmit} autoComplete={"off"}>
          <FormGroup>
            {this.props.withButton ? (
              <Fragment>
                {this.getFields()}
                <FormButton type="submit">
                  {this.props.buttonLabel}
                </FormButton>
              </Fragment>
            ) : (
              this.getFields()
            )}
            <Errors error={this.props.errors}/>
            <LoadingModal
              loading={!!this.props.loading}
              error={!!this.props.error}
              successMessage={this.props.successMessage}
              withSuccess
            />
          </FormGroup>
        </form>
      </div>
    )
  }
}

export default Form;

Form.defaultProps = {
  withButton: true,
  withMaxWidthLimit: false,
};

Form.propTypes = {
  error: PropTypes.bool.isRequired,
  errors: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  successMessage: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string,
  withButton: PropTypes.bool.isRequired,
  withMaxWidthLimit: PropTypes.bool.isRequired,
};
