import React, {Fragment} from 'react';
import TextField from "@material-ui/core/TextField";
import {getFieldError} from "../../utils/form";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";
import Form from "../Form";

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
    const emailError = getFieldError(this.props.register.error, "email");
    const passwordError = getFieldError(this.props.register.error, "password");
    const handleError = getFieldError(this.props.register.error, "handle");
    return (
      <Fragment>
        <TextField
          error={!!handleError}
          autoFocus
          required
          id="handle"
          label="Handle"
          name="handle"
          value={this.state.formData.handle}
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
          error={!!emailError}
          autoFocus
          required
          id="email"
          label="Email"
          name="email"
          value={this.state.formData.email}
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
          type={this.state.showPassword ? "text" : "password"}
          error={!!passwordError}
          required
          id="password"
          label="Password"
          name="password"
          value={this.state.formData.password}
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
          type={this.state.showPassword ? "text" : "password"}
          error={!!passwordError}
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
