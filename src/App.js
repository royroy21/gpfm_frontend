import React from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import EventIcon from '@material-ui/icons/Event';
import MessageIcon from '@material-ui/icons/Message';
import SettingsIcon from '@material-ui/icons/Settings';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import GPAppBar from "./components/GPAppBar";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#5C5C5C",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
      width: 'auto',
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
  paper: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(2),
    textAlign: 'left',
  },
}));

function App() {

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root} style={{height: "900px"}}>
        <GPAppBar />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
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
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper className={classes.paper}>Hello you beautiful people :)</Paper>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
