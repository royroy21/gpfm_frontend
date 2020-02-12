import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
});

// TODO - having to do this as I cannot extend a
// class that uses withStyles.
// Poor form material UI :(
// Prolly should find a better way
class FormButton extends React.Component {

  filteredProps() {
    return Object.keys(this.props).reduce((object, key) => {
      if (key !== "classes") {
        object[key] = this.props[key]
      }
      return object
    }, {})
  }

  render (){
    const { classes } = this.props;
    return (
      <Button
        className={classes.button}
        {...this.filteredProps()}
      />
    )
  }
}

export default withStyles(styles)(FormButton);
