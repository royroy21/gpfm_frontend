import React from 'react';
import {withStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import LoadingModal from "../LoadingModal";
import RegisterWrapper from "./RegisterWrapper";
import Errors from "../Errors";
import {getFieldError} from "../../utils/form";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  error: {
    color: theme.palette.secondary.main,
  },
  formGroup: {
    width: "30%",
  },
});


class Register extends React.Component {

  state = {
    formData: {
      email: '',
      password: '',
    },
    showPassword: false,
  };

  componentDidMount() {
    this.props.actions.clearRegister();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.store.user.object) {
      setTimeout(() => this.props.history.push("/"), 1500);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = this.state.formData;
    this.props.actions.postRegister(formData);
  };

  handleChange = (event) => {
    const formData = this.state.formData;
    formData[event.target.name] = event.target.value;
    this.setState({formData});
  };

  toggleShowPassword = () => {
    this.setState(state => {
      return {showPassword: !state.showPassword}
    })
  };

  render (){
    const { classes } = this.props;
    const emailError = getFieldError(this.props.store.register.error, "email");
    const passwordError = getFieldError(this.props.store.register.error, "password");
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup className={classes.formGroup}>
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
          <FormControlLabel
            control={
              <Switch
                checked={this.state.showPassword}
                onChange={this.toggleShowPassword}
              />
            }
            label={this.state.showPassword ? "Password visible" : "Password hidden"}
          />
          <Button type="submit" className={classes.button}>
            REGISTER
          </Button>
          <Errors error={this.props.store.register.error} />
          <LoadingModal
            loading={
              !! this.props.store.token.loading
              || !!this.props.store.user.loading
              || !!this.props.store.register.loading
            }
            error={
              !!this.props.store.token.error
              || !!this.props.store.user.error
              || !!this.props.store.register.error
            }
            successMessage={"Registered"}
            withSuccess
          />
        </FormGroup>
      </form>
    )
  }
}

export default withStyles(styles)(RegisterWrapper(Register))

// TODO - add proptypes here
