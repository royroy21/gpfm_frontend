import React, {Fragment} from 'react';
import {withStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import LoginWrapper from "./LoginWrapper";
import NonFieldErrors from "../Errors/Errors";
import LoadingModal from "../LoadingModal";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
});

class Login extends React.Component {

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
    this.props.actions.postToken(data);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render (){
    const { classes } = this.props;
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <TextField
            error={!!this.props.store.token.error}
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
            error={!!this.props.store.token.error}
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
            LOGIN
          </Button>
          <NonFieldErrors error={this.props.store.token.error}/>
          <LoadingModal
            loading={this.props.store.token.loading || this.props.store.user.loading}
            error={this.props.store.token.error || this.props.store.user.error}
            successMessage={"Logged In"}
            withSuccess
          />
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
