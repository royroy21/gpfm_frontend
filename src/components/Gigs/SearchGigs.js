import React from "react";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core";
import Form from "../Form";
import FormButton from "../Form/FormButton";
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  searchFieldsContainer: {
    display: "flex",
    width: "100%",
  },
  searchField: {
    width: "40%",
    margin: `0 ${theme.spacing(1)}px 0 ${theme.spacing(1)}px`,
  },
  searchFieldDivider: {
    margin: `${theme.spacing(2)}px ${theme.spacing(1)}px 0 ${theme.spacing(1)}px`,
  },
});

class SearchGigs extends Form {

  getSearchGigsLocationLabel() {
    return "SE14"
  }

  getFields() {
    const { classes } = this.props;
    return (
      <div className={classes.searchFieldsContainer}>
        <TextField
          className={classes.searchField}
          id={"search-gigs-keywords"}
          label={"I'm looking for..."}
          // variant={"outlined"}
        />
        <p className={classes.searchFieldDivider}>{"in"}</p>
        <TextField
          className={classes.searchField}
          id={"search-gigs-location"}
          label={this.getSearchGigsLocationLabel()}
          // variant={"outlined"}
        />
        <FormButton type="submit">
          <SearchIcon />
        </FormButton>
      </div>
    )
  }
}

export default withStyles(styles)(SearchGigs);
