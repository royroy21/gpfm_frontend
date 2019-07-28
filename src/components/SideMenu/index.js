import React, {Fragment} from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SendIcon from '@material-ui/icons/Send';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import EventIcon from '@material-ui/icons/Event';
import MessageIcon from '@material-ui/icons/Message';
import SettingsIcon from '@material-ui/icons/Settings';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import SideMenuWrapper from "./wrapper";
import {withRouter} from "react-router-dom";

class SideMenu extends React.Component {

  register = () => {
    this.props.history.push("/register");
  };

  logout = () => {
    this.props.actions.logout();
    this.props.history.push("/login");
  };

  render() {
    const {object: user} = this.props.store.user;

    return (
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          Looking for Gigpigs
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LibraryMusicIcon />
          </ListItemIcon>
          You're a Gigpig
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          Messages
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          Events
        </MenuItem>
        {user ? (
          <Fragment>
            <MenuItem>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              My account
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              Settings
            </MenuItem>
          </Fragment>
        ) : (
          <MenuItem onClick={this.register}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            Register User
          </MenuItem>
        )}
        {user ? (
          <MenuItem onClick={this.logout}>
            <ListItemIcon>
              <KeyboardReturnIcon />
            </ListItemIcon>
            Logout
          </MenuItem>
          )
          : (
            null
          )
        }
      </MenuList>
    )
  }
}

export default SideMenuWrapper(withRouter(SideMenu));
