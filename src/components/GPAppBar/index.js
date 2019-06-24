import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {createMuiTheme, makeStyles} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import {fade} from "@material-ui/core/styles";
import pig2 from "./pig2.svg"

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
  button: {
    border: "1px solid #606FC7",
    margin: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
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
      width: '400px',
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
    padding: theme.spacing(2),
    textAlign: 'left',
    // color: theme.palette.text.secondary,
  },
}));



// class GPAppBar extends React.Component {
//
//   state = {
//     open: false,
//   };
//
//   getStyleClasses() {
//     return useStyles();
//   }
//
//   render() {
//
//     const classes = this.getStyleClasses();
//
//     return (
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" color="inherit" aria-label="Menu">
//             <Button color="inherit"><MenuIcon /></Button>
//           </IconButton>
//           <Typography variant="h6">
//           </Typography>
//           <div>
//             <InputBase
//               placeholder="Search gigpig..."
//               inputProps={{ 'aria-label': 'Search' }}
//             />
//           </div>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//     )
//   }
// }

function GPAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/*<IconButton*/}
            {/*edge="start"*/}
            {/*className={classes.menuButton}*/}
            {/*color="inherit"*/}
            {/*aria-label="Open drawer"*/}
          {/*>*/}
            {/*<MenuIcon/>*/}
          {/*</IconButton>*/}
          <img style={{height: "50px", width: "50px", marginRight: "10px"}} src={pig2} alt="Logo" />
          <Typography className={classes.title} variant="h6" noWrap>
            Gigpig
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{'aria-label': 'Search'}}
            />
          </div>
          <Button className={classes.button}>
            LOGIN
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default GPAppBar
