import React from 'react';

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

class SideMenu extends React.Component {

  logout = () => {
    this.props.actions.logout();
  };

  render() {
    const {object: user} = this.props.store.user;

    return (
      <MenuList>
        <MenuItem >
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          Looking for Gigpigs
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <LibraryMusicIcon />
          </ListItemIcon>
          You're a Gigpig
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          Messages
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          Events
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          My account
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          Settings
        </MenuItem>
        {user ? (
          <div onClick={this.logout}>
            <MenuItem >
              <ListItemIcon>
                <KeyboardReturnIcon />
              </ListItemIcon>
              Logout
            </MenuItem>
          </div>
          )
          : (
            null
          )
        }
      </MenuList>
    )
  }
}

export default SideMenuWrapper(SideMenu);
