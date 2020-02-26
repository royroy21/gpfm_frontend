import React, {Fragment} from "react";
import {withStyles} from "@material-ui/core";
import Form from "../Form";
import TextField from "@material-ui/core/TextField";
import MultipleKeywordSelector from "../Form/MultipleKeywordSelector";
import {KeyboardDatePicker} from "@material-ui/pickers";
import PropTypes from "prop-types";
import Field from "../Form/Field";
import SingleImageField from "../Form/SingleImageField";

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
      venue: '',
      description: '',
      genres: [],
      start_date: null,
      end_date: null,
      image: null,
    },
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { location } = this.props;
    if (prevProps.location !== location) {
      this.formData.append("location", location);
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

  handleSubmit = (event) => {
    event.preventDefault();
    this.formData.append("user", this.props.user.object.id);
    this.props.actions.postGig(this.formData);
  };

  handleStartDateChange = (event) => {
    const formData = {
      ...this.state.formData,
      "start_date": event,
    };
    this.setState({formData});
    this.formData.append("start_date", event.format());
  };

  handleEndDateChange = (event) => {
    const formData = {
      ...this.state.formData,
      "end_date": event,
    };
    this.setState({formData});
    this.formData.append("end_date", event.format());
  };

  handleAddImage = (event) => {
    const image = event.target.files[0];
    if (image) {
      this.handleChangeFile(event, "image");
    }
  };

  handleRemoveImage = () => {
    const formData = {
      ...this.state.formData,
      image: null,
    };
    this.setState({formData});
    this.formData.delete("image");
    this.formData.append("image", "");
  };

  getFields() {
    const { classes } = this.props;
    const { objects: genres } = this.props.genres;
    if (!genres) {
      return null;
    }
    return (
      <Fragment>
        <Field
          Field={TextField}
          error={this.props.gig.error}
          autoFocus
          required
          id={"title"}
          label={"Title"}
          name={"title"}
          value={this.state.formData.title}
          onChange={this.handleChange}
          margin={"normal"}
        />
        <SingleImageField
          src={this.state.formData.image}
          handleAddImage={this.handleAddImage}
          handleRemoveImage={this.handleRemoveImage}
          error={this.props.gig.error}
        />
        <Field
          Field={TextField}
          error={this.props.gig.error}
          id={"description"}
          label={"Description"}
          name={"description"}
          value={!!this.state.formData.description ? this.state.formData.description : " "}
          onChange={this.handleChange}
          multiline
          rows={"4"}
          margin={"normal"}
          variant={"outlined"}
        />
        <Field
          Field={MultipleKeywordSelector}
          error={this.props.gig.error}
          name={"genres"}
          handleFormChange={this.handleGenresChange}
          options={genres}
          placeholderHasItems={" ...add more genres"}
          placeholderNoItems={"Type to add genres"}
          label={"Gig Genres"}
        />
        <Field
          Field={TextField}
          error={this.props.gig.error}
          id={"venue"}
          label={"Venue"}
          name={"venue"}
          placeholder={"eg.. Brixton"}
          value={this.state.formData.venue}
          onChange={this.handleChange}
          margin="normal"
        />
        {/*
          TODO - errors at date fields are not underneath
        */}
        <div style={{display: "flex"}}>
          <Field
            Field={KeyboardDatePicker}
            error={this.props.gig.error}
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
            onChange={this.handleStartDateChange}
          />
          <Field
            Field={KeyboardDatePicker}
            error={this.props.gig.error}
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
            onChange={this.handleEndDateChange}
          />
        </div>
      </Fragment>
    )
  }
}

export default withStyles(styles)(AddGigForm);

AddGigForm.propTypes = {
  location: PropTypes.number,
};
