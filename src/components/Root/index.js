import React from 'react';

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import { Route } from "react-router-dom";

import GPAppBar from "../GPAppBar";
import Login from "../User/Login";
import SideMenu from "../SideMenu";
import Footer from "../Footer";

const styles = theme => ({
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
});

// TODO - sort this out
function Home() {
  return (
    <p>home</p>
  );
}


class Root extends React.Component {

  childComponentHeightDifference = 190;

  state = {
    screenWidth: 0, screenHeight: 0
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    });
  };

  getScreenDimensions() {
    return {
      height: this.state.screenHeight,
      width: this.state.screenWidth,
    }
  }

  getChildComponentHeight() {
    return this.state.screenHeight - this.childComponentHeightDifference;
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} style={this.getScreenDimensions()}>
        <GPAppBar />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Paper className={classes.paper} style={{height: this.getChildComponentHeight()}}>
              <SideMenu />
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper className={classes.paper} style={{height: this.getChildComponentHeight()}}>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
            </Paper>
          </Grid>
        </Grid>
        <Paper className={classes.paper}>
          <Footer />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Root);
