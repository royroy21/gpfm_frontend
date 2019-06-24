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


class SideMenu extends React.Component {

  render() {
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
        <MenuItem >
          <ListItemIcon>
            <KeyboardReturnIcon />
          </ListItemIcon>
          Logout
        </MenuItem>
      </MenuList>
    )
  }
}

export default SideMenu
