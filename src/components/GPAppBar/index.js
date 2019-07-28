import React from 'react';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {fade} from "@material-ui/core/styles";
import {withStyles} from "@material-ui/core";

import pig2 from "../../images/pig2.svg"
import {Link, withRouter} from "react-router-dom";
import GPAppBarWrapper from "./wrapper";

const styles = theme => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
  },
  loginButton: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  loginLink: {
    textDecoration: "none",
  },
  usernameButton: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '400px',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '50px',
    width: '50px',
    marginRight: theme.spacing(2),
  },
});


class GPAppBar extends React.Component {

  getLoginButton() {
    const { classes } = this.props;
    const {object: user} = this.props.store.user;
    if (user) {
      return (
        <Button className={classes.usernameButton}>
          {user.username}
        </Button>
      )
    }
    if (this.props.location.pathname === "/login") {
      return (
        <Button className={classes.usernameButton}>
          LOGIN
        </Button>
      )
    } else {
      return (
        <Link to="/login" className={classes.loginLink}>
          <Button className={classes.loginButton}>
            LOGIN
          </Button>
         </Link>
      )
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Link to="/">
            <img className={classes.image} src={pig2} alt="Logo" />
          </Link>
            <Typography className={classes.title} variant="h6" noWrap>
              <Link to="/" style={{textDecoration: "none", color: "white"}}>Gigpig</Link>
            </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{'aria-label': 'Search'}}
            />
          </div>
          {this.getLoginButton()}
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(GPAppBarWrapper(withRouter(GPAppBar)));
