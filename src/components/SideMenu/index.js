import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SearchIcon from '@material-ui/icons/Search';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import SideMenuWrapper from "./wrapper";
import {withRouter} from "react-router-dom";
import {
  accountRoute,
  loginRoute,
  registerRoute,
  gigsSearchRoute,
  addGigRoute,
  addedGigsRoute,
} from "../../settings/internalRoutes";

class SideMenu extends React.Component {

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

  menuEntries = [
    {
      key: "menu-search",
      name: "Search",
      icon: <SearchIcon />,
      onClick: () => this.props.history.push(gigsSearchRoute),
      auth: false,
    },
    {
      key: "menu-add",
      name: "Add",
      icon: <AddIcon />,
      onClick: () => this.props.history.push(addGigRoute),
      auth: true,
    },
    {
      key: "menu-added",
      name: "Added",
      icon: <PlaylistAddCheckIcon />,
      onClick: () => this.props.history.push(addedGigsRoute),
      auth: true,
    },
    {
      key: "menu-messages",
      name: "Messages",
      icon: <ChatBubbleOutlineIcon />,
      onClick: () => {},
      auth: true,
    },
    {
      key: "menu-account",
      name: "My Account",
      icon: <FaceIcon />,
      onClick: () => this.props.history.push(accountRoute),
      auth: true,
    },
    {
      key: "menu-out",
      name: "Log out",
      icon: <KeyboardReturnIcon />,
      onClick: this.logout,
      auth: true,
    },
  ];

  renderItem(entry) {
    return (
      <MenuItem
        key={entry.key}
        onClick={entry.onClick}
      >
        <ListItemIcon>
          {entry.icon}
        </ListItemIcon>
        {entry.name}
      </MenuItem>
    )
  }

  render() {
    const {object: user} = this.props.store.user;
    const isRegistrationPage =
      this.props.history.location.pathname === registerRoute;
    return (
      <MenuList>
        {this.menuEntries.map(entry => {
          if (entry.auth) {
            if (user) {
              return (
                this.renderItem(entry)
              )
            } return null;
          } else {
            return (
              this.renderItem(entry)
            )
          }
        })}
        {!user ? (
          this.renderItem({
            name: isRegistrationPage ? "Login" : "Register User",
            onClick: isRegistrationPage ? this.login : this.register,
            icon: <FaceIcon />,
          })
        ) : null}
      </MenuList>
    );
  }
}

export default SideMenuWrapper(withRouter(SideMenu));
