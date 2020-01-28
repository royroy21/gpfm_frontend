import React, {Fragment} from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import MessageIcon from '@material-ui/icons/Message';
import SettingsIcon from '@material-ui/icons/Settings';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import SideMenuWrapper from "./wrapper";
import {withRouter} from "react-router-dom";
import {
  accountRoute,
  loginRoute,
  registerRoute,
  gigsSearchRoute,
} from "../../settings/internalRoutes";

class SideMenu extends React.Component {

  goToAccount = () => {
    this.props.history.push(accountRoute);
  };

  register = () => {
    this.props.history.push(registerRoute);
  };

  logout = () => {
    localStorage.removeItem("authToken");
    this.props.actions.logout();
    this.props.history.push(loginRoute);
  };

  login = () => {
    this.props.history.push(loginRoute);
  };

  goToSearchGigs = () => {
    this.props.history.push(gigsSearchRoute);
  };

  render() {
    const {object: user} = this.props.store.user;
    const isRegistrationPage =
      this.props.history.location.pathname === registerRoute;

    return (
      <MenuList>
        <MenuItem onClick={this.goToSearchGigs}>
          <ListItemIcon>
            <LibraryMusicIcon />
          </ListItemIcon>
          {"Search Gigs"}
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          {"Messages"}
        </MenuItem>
        {user ? (
          <Fragment>
            <MenuItem onClick={this.goToAccount}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              {"My Account"}
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              {"Settings"}
            </MenuItem>
            <MenuItem onClick={this.logout}>
              <ListItemIcon>
                <KeyboardReturnIcon />
              </ListItemIcon>
              {"Logout"}
            </MenuItem>
          </Fragment>
        ) : (
          <MenuItem onClick={isRegistrationPage ? this.login : this.register}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            {isRegistrationPage ? "Login" : "Register User"}
          </MenuItem>
        )}
      </MenuList>
    )
  }
}

export default SideMenuWrapper(withRouter(SideMenu));
