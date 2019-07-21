import React from 'react';

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import { Route } from "react-router-dom";

import GPAppBar from "../GPAppBar";
import SideMenu from "../SideMenu";
import LoginContainer from "../../containers/Login";

const styles = theme => ({
  root: {
    backgroundColor: '#5C5C5C',
  },
  paper: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(2),
  },
});

// TODO - sort this out
function Home() {
  return (
    <p>home</p>
  );
}


class Root extends React.Component {

  paperHeightDifference = 125;

  state = {
    screenWidth: 0,
    screenHeight: 0,
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

  getScreenHeight() {
    return `${this.state.screenHeight}px`;
  }

  getPaperHeight() {
    const paperHeight = this.state.screenHeight - this.paperHeightDifference;
    return `${paperHeight}px`;
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} style={{height: this.getScreenHeight()}}>
        <GPAppBar />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Paper className={classes.paper} style={{height: this.getPaperHeight()}}>
              <SideMenu />
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper className={classes.paper} style={{height: this.getPaperHeight()}}>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={LoginContainer} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Root);
