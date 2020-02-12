import React, {Fragment} from 'react';
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";
import Form from "../Form";
import Field from "../Form/Field";

class RegisterForm extends Form {

  state = {
    formData: {
      email: '',
      password: '',
      re_password: '',
      handle: '',
    },
    showPassword: false,
  };

  componentDidMount() {
    const randomHandle = this.generateRandomHandle();
    const formData = {
      ...this.state.formData,
      "handle": randomHandle,
    };
    this.setState({formData});
    this.formData.append("handle", randomHandle);
    this.props.actions.clearRegister();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.actions.postRegister(this.formData);
  };

  generateRandomHandle = () => {
    const randomNumber = Math.floor(Math.random() * Math.floor(99999999));
    return `gigpig#${randomNumber}`;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.user.object) {
      setTimeout(() => this.props.history.push("/"), 1500);
    }
  }

  toggleShowPassword = () => {
    this.setState(state => {
      return {showPassword: !state.showPassword}
    })
  };

  getFields (){
    return (
      <Fragment>
        <Field
          Field={TextField}
          error={this.props.register.error}
          autoFocus
          required
          id="handle"
          label="Handle"
          name="handle"
          value={this.state.formData.handle}
          onChange={this.handleChange}
          margin="normal"
        />
        <Field
          Field={TextField}
          error={this.props.register.error}
          autoFocus
          required
          id="email"
          label="Email"
          name="email"
          value={this.state.formData.email}
          onChange={this.handleChange}
          margin="normal"
        />
        <Field
          Field={TextField}
          type={this.state.showPassword ? "text" : "password"}
          error={this.props.register.error}
          required
          id="password"
          label="Password"
          name="password"
          value={this.state.formData.password}
          onChange={this.handleChange}
          margin="normal"
        />
        <Field
          Field={TextField}
          error={this.props.register.error}
          type={this.state.showPassword ? "text" : "password"}
          required
          id="re_password"
          label="Confirm Password"
          name="re_password"
          value={this.state.formData.re_password}
          onChange={this.handleChange}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.showPassword}
              onChange={this.toggleShowPassword}
            />
          }
          label={this.state.showPassword ? "Passwords visible" : "Passwords hidden"}
        />
      </Fragment>
    )
  }
}

export default RegisterForm;

RegisterForm.propTypes = {
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  register: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
