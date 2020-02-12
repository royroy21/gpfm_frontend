import React, {Fragment} from "react";
import {withStyles} from "@material-ui/core";
import Form from "../Form";
import TextField from "@material-ui/core/TextField";
import MultipleKeywordSelector from "../Form/MultipleKeywordSelector";
import {KeyboardDatePicker} from "@material-ui/pickers";
import PropTypes from "prop-types";

const styles = theme => ({
  startDatePicker: {
    marginRight: theme.spacing(1),
  },
  endDatePicker: {
    marginLeft: theme.spacing(1),
  },
});

class AddGigForm extends Form {

  state = {
    formData: {
      title: '',
      description: '',
      genres: [],
      start_date: null,
      end_date: null,
      location: null,

      // TODO - add pictures upload, music upload and link upload?
      // image: '',
      // link: '',
    },
    // forceBlankImage: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { location } = this.props;
    if (prevProps.location !== this.props.location) {
      const { formData } = this.state;
      const newFormData = {
        ...formData,
        location,
      };
      this.setState({formData: newFormData})
    }
  }

  componentDidMount() {
    this.getGenres();
  };

  getGenres() {
    if (!this.props.genres.objects) {
      this.props.actions.getGenres();
    }
  }

  handleGenresChange = (genres) => {
    const newGenres = this.props.genres.objects.filter(genre => genres.includes(genre.name));
    const formData = {
      ...this.state.formData,
      genres: newGenres,
    };
    this.setState({formData});

    this.formData.delete("genres");
    newGenres.map(genre => this.formData.append("genres", genre.id));
  };

  getFields() {
    const { classes } = this.props;
    const { objects: genres } = this.props.genres;
    if (!genres) {
      return null;
    }
    return (
      <Fragment>
        <TextField
          autoFocus
          // required
          id="title"
          label="Title"
          name="title"
          // value={this.state.formData.handle}
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
          id={"description"}
          label={"Description"}
          name={"description"}
          // value={!!this.state.formData.bio ? this.state.formData.bio : " "}
          onChange={this.handleChange}
          multiline
          rows={"4"}
          margin={"normal"}
          variant={"outlined"}
        />
        <MultipleKeywordSelector
          handleFormChange={this.handleGenresChange}
          options={genres}
          // initialSelectedItems={initialSelectedGenreNames}
          placeholderHasItems={" ...add more genres"}
          placeholderNoItems={"Type to add genres"}
          label={"Gig Genres"}
        />
        <div style={{display: "flex"}}>
          <KeyboardDatePicker
            className={classes.startDatePicker}
            disableToolbar
            disablePast
            variant={"dialog"}
            format={"DD/MM/YYYY"}
            margin={"normal"}
            id={"start_date"}
            name={"start_date"}
            label={"Start Date"}
            value={this.state.formData.start_date}
            // onChange={this.handleDOBChange}
          />
          <KeyboardDatePicker
            className={classes.endDatePicker}
            disableToolbar
            disablePast
            variant={"dialog"}
            format={"DD/MM/YYYY"}
            margin={"normal"}
            id={"end_date"}
            name={"end_date"}
            label={"End Date"}
            value={this.state.formData.end_date}
            // onChange={this.handleDOBChange}
          />
        </div>
      </Fragment>
    )
  }
}

export default withStyles(styles)(AddGigForm);

AddGigForm.propTypes = {
  location: PropTypes.object,
};
