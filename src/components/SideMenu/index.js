import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';


class SideMenu extends React.Component {

  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => {
      return {
        open: !state.open,
      }
    })
  };

  handleClose = (event) => {
  };

  render() {
    return (
      <div style={{width: "100%"}}>
        <Button
          aria-controls="menu-list-grow"
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          <p style={{color: "black"}}>Menu</p>
        </Button>
        <Popper open={this.state.open} keepMounted transition disablePortal>
          {({TransitionProps, placement}) => (
            <Grow
              {...TransitionProps}
              style={{transformOrigin: placement === 'left' ? 'center left' : 'center left'}}
            >
              <Paper id="menu-list-grow">
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    )
  }
}

export default SideMenu
