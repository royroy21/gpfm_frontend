import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import SideMenu from "./components/SideMenu";
import GPAppBar from "./components/GPAppBar";
import Login from "./components/User/Login";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#5C5C5C',
  },
  paper: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(2),
    textAlign: 'left',
  },
}));

function Home() {

  return (
    <p>home</p>
  );
}


function App() {

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Router>
      <div className={classes.root} style={{height: "900px"}}>
        <GPAppBar />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <SideMenu />
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper className={classes.paper}>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
            </Paper>
          </Grid>
        </Grid>
      </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
