import React from 'react';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {fade} from "@material-ui/core/styles";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';

import {Link, withRouter} from "react-router-dom";
import GPAppBarWrapper from "./wrapper";
import HandleWithAvatarDisplay from "../User/UserHandleAvatarDisplay";
import {loginRoute} from "../../settings/internalRoutes";
import Form from "../Form";

const styles = theme => ({
  appBar: {
    backgroundColor: "#424242",
    width: "auto",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    boxShadow: "0 8px 6px -6px black",
  },
  loginButton: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  loginLink: {
    textDecoration: "none",
  },
  username: {
    margin: theme.spacing(1),
    textTransform: "lowercase",
    color: "#F50057",
  },
  menuIcon: {
    marginRight: "10px",
    color: "#F50057",
  },
  menuIconOnHover: {
    marginRight: "10px",
    color: "#F50057",
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
  titleLink: {
    textDecoration: "none",
    color: "white",
  },
  avatar: {
    margin: 10,
  },
});


class GPAppBar extends React.Component {

  componentDidMount() {
    const authTokenFromRedux = this.props.store.token.object;
    const authTokenFromLocalStorage = localStorage.getItem("authToken");
    if (!authTokenFromRedux && authTokenFromLocalStorage) {
      this.props.actions.updateToken({"auth_token": authTokenFromLocalStorage});
      this.props.actions.getUser();
    }
    this.props.actions.getIPAPI();
  }

  getLoginButton() {
    const { classes } = this.props;
    const isLoggedIn = this.props.store.user.object;

    if (isLoggedIn) {
      return (
        <HandleWithAvatarDisplay
          user={this.props.store.user}
        />
      )
    } else {
      if (this.props.location.pathname !== loginRoute) {
        return (
          <Link to={loginRoute} className={classes.loginLink}>
            <Button className={classes.loginButton}>
              {"Login"}
            </Button>
          </Link>
        )
      } else {
        return (
          null
        )
      }
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          {this.props.showMenuButton ? (
            <Link to="/menu">
              <ViewHeadlineIcon fontSize={"large"} className={classes.menuIcon}/>
            </Link>
          ) : (
            null
          )}
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/" className={classes.titleLink}>{"GigPig"}</Link>
          </Typography>
          {this.getLoginButton()}
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(GPAppBarWrapper(withRouter(GPAppBar)));

Form.propTypes = {
  showMenuButton: PropTypes.bool.isRequired,
  lastURL: PropTypes.string,
};
