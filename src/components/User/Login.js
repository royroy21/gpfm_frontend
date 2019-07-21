import React from 'react';
import {withStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";

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
      <form onSubmit={this.handleSubmit}>
        <TextField
          id="username"
          label="Username"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
          margin="normal"
        /><br />
        <TextField
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
      </form>
    )
  }
}

export default withStyles(styles)(Login)

// TODO - add proptypes here
