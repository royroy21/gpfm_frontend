import React, {Fragment} from 'react';
import {withStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import LoginWrapper from "./LoginWrapper";
import Errors from "../Errors";
import LoadingModal from "../LoadingModal";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  formGroup: {
    width: "30%",
  },
});

class Login extends React.Component {

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
    if (this.props.store.user.object) {
      setTimeout(() => this.props.history.push("/"), 1500);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = this.state.formData;
    this.props.actions.postToken(data);
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
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <FormGroup className={classes.formGroup}>
            <TextField
              error={!!this.props.store.token.error}
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
              error={!!this.props.store.token.error}
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
            <Button type="submit" className={classes.button}>
              LOGIN
            </Button>
            <Errors error={this.props.store.token.error}/>
            <LoadingModal
              loading={!!this.props.store.token.loading || !!this.props.store.user.loading}
              error={!!this.props.store.token.error || !!this.props.store.user.error}
              successMessage={"Logged In"}
              withSuccess
            />
          </FormGroup>
        </form>
        <br />
        <Divider />
        <MenuItem onClick={() => this.props.history.push("/register")}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          Register New User
        </MenuItem>
      </Fragment>
    )
  }
}

export default withStyles(styles)(LoginWrapper(Login))

// TODO - add proptypes here
