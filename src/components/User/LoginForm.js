import React, {Fragment} from 'react';
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";
import Form from "../Form"
import Field from "../Form/Field";

class LoginForm extends Form {

  state = {
    formData: {
      email: '',
      password: '',
    },
    showPassword: false,
  };

  componentDidMount() {
    this.props.actions.clearToken();
    this.props.actions.clearUser();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.token.object) {
      const { auth_token: authToken } = this.props.token.object;
      localStorage.setItem('authToken', authToken);
    }
    if (this.props.user.object) {
      setTimeout(() => this.props.history.push("/"), 1500);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.actions.postToken(this.formData);
  };

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
          autoFocus
          error={this.props.token.error}
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
          error={this.props.token.error}
          required
          id="password"
          label="Password"
          name="password"
          value={this.state.formData.password}
          onChange={this.handleChange}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.showPassword}
              onChange={this.toggleShowPassword}
            />              }
          label={this.state.showPassword ? "Password visible" : "Password hidden"}
        />
      </Fragment>
    )
  }
}

export default LoginForm;

LoginForm.propTypes = {
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  token: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
