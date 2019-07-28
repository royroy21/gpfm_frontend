import React from 'react';
import {withStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import LoadingModal from "../LoadingModal";
import RegisterWrapper from "./RegisterWrapper";
import Errors from "../Errors";
import {getFieldError} from "../../utils/form";

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  error: {
    color: theme.palette.secondary.main,
  }
});


class Register extends React.Component {

  state = {
    username: '',
    password: '',
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.store.user.object) {
      setTimeout(() => this.props.history.push("/"), 1500);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = this.state;
    this.props.actions.postRegister(data);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render (){
    const { classes } = this.props;
    const usernameError = getFieldError(this.props.store.register.error, "username");
    const passwordError = getFieldError(this.props.store.register.error, "password");
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          error={!!usernameError}
          autoFocus
          required
          id="username"
          label="Username"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
          margin="normal"
        /><br />
        <TextField
          type={"password"}
          error={!!passwordError}
          required
          id="password"
          label="Password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
          margin="normal"
        />
        <br />
        <br />
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
      </form>
    )
  }
}

export default withStyles(styles)(RegisterWrapper(Register))

// TODO - add proptypes here
