import React, {Fragment} from 'react';
import {withStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ClearIcon from '@material-ui/icons/Clear';
import SyncIcon from '@material-ui/icons/Sync';
import GPAvatar from "./UserHandleAvatarDisplay/GPAvatar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import PropTypes from "prop-types";
import Form from "../Form";
import moment from "moment";
import {KeyboardDatePicker} from "@material-ui/pickers";
import MultipleKeywordSelector from "../Form/MultipleKeywordSelector";
import Field from "../Form/Field";
import Error from "../Form/Error";

const styles = theme => ({
  button: {
    backgroundColor: theme.palette.secondary.main,
  },
  error: {
    color: theme.palette.secondary.main,
  },
  formGroup: {
    width: "35%",
  },
  rightIcon: {
    marginLeft: "10px",
  },
});


class AccountForm extends Form {

  state = {
    formData: {
      handle: '',
      avatar: '',
      bio: '',
      dob: null,
      genres: [],
    },
    forceBlankImage: false,
  };

  imageInput = React.createRef();

  componentDidMount() {
    this.setFormDefaults();
    this.getGenres();
  };

  setFormDefaults() {
    const {
      bio,
      dob,
      genres,
      handle,
    } = this.props.user.object;
    const formData = {
      handle: handle,
      avatar: null,
      bio: bio,
      dob: dob ? new moment(dob) : null,
      genres: genres,
    };
    this.setState({formData});
    this.setState({forceBlankImage: !this.props.user.object.avatar})
  }

  getGenres() {
    if (!this.props.genres.objects) {
      this.props.actions.getGenres();
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.actions.patchUser(this.formData);
  };

  handleAddImage = (event) => {
    const image = event.target.files[0];
    if (image) {
      this.handleChangeFile(event, "avatar");
    }
    this.setState({forceBlankImage: false})
  };

  removeAvatar = () => {
    const formData = {
      ...this.state.formData,
      avatar: null,
    };
    this.setState({formData});
    this.setState({forceBlankImage: true});

    this.formData.delete("avatar");
    this.formData.append("avatar", "");

    this.imageInput.value = null;
  };

  getAvatarSrc() {
    const { object: userObject } = this.props.user;
    const userAvatarSrc = userObject ? userObject.avatar : null;

    const { avatar: formAvatar }  = this.state.formData;
    const formAvatarSrc =  formAvatar ? URL.createObjectURL(formAvatar) : null;

    return formAvatarSrc ? formAvatarSrc : userAvatarSrc;
  };

  handleDOBChange = (date) => {
    const formData = {
      ...this.state.formData,
      dob: date,
    };
    this.setState({formData});
    this.formData.append("dob", date.format("YYYY-MM-DD"));
  };

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

  getFields (){
    const { objects: genres } = this.props.genres;
    if (!genres) {
      return null;
    }
    const initialSelectedGenreNames = genres
      .filter(genre => this.props.user.object.genres.includes(genre.id))
      .map(genre => genre.name);
    const { classes } = this.props;
    const avatarSrc = this.getAvatarSrc();
    return (
      <Fragment>
        <Field
          Field={TextField}
          error={this.props.user.error}
          required
          id="handle"
          label="Handle"
          name="handle"
          value={this.state.formData.handle}
          onChange={this.handleChange}
          margin="normal"
        />
        <GPAvatar
          forceBlank={this.state.forceBlankImage}
          size={"large"}
          src={avatarSrc}
        />
        <Error
          name={"avatar"}
          error={this.props.user.error}
        />
        <br />
        <input
          style={{display: "none"}}
          type={"file"}
          onChange={this.handleAddImage}
          ref={imageInput => this.imageInput = imageInput}
        />
        {!this.state.forceBlankImage ? (
          <ButtonGroup aria-label="outlined primary button group" >
            <Button
              style={{width: "100%"}}
              onClick={() => this.imageInput.click()}
            >{"Change"}
            <SyncIcon className={classes.rightIcon} />
            </Button>
            <Button
              style={{width: "100%"}}
              onClick={this.removeAvatar}
            >{"Remove"}
            <ClearIcon className={classes.rightIcon} />
            </Button>
          </ButtonGroup>
        ) : (
          <Button
            variant={"outlined"}
            onClick={() => this.imageInput.click()}
          >{"Upload Avatar"}
            <CloudUploadIcon className={classes.rightIcon} />
          </Button>
        )}
        <MultipleKeywordSelector
          handleFormChange={this.handleGenresChange}
          options={genres}
          initialSelectedItems={initialSelectedGenreNames}
          placeholderHasItems={" ...add more genres"}
          placeholderNoItems={"Type to add genres"}
          label={"Your Genres"}
        />
        <Field
          Field={TextField}
          autoFocus
          id={"bio"}
          label={"Bio"}
          name={"bio"}
          value={!!this.state.formData.bio ? this.state.formData.bio : " "}
          onChange={this.handleChange}
          multiline
          rows={"4"}
          margin={"normal"}
          variant={"outlined"}
        />
        <KeyboardDatePicker
          disableToolbar
          openTo={"year"}
          disableFuture
          variant={"dialog"}
          format={"DD/MM/YYYY"}
          margin={"normal"}
          id={"dob"}
          name={"dob"}
          label={"Date of Birth"}
          value={this.state.formData.dob}
          onChange={this.handleDOBChange}
        />
      </Fragment>
    )
  }
}

export default withStyles(styles)(AccountForm)

AccountForm.propTypes = {
  actions: PropTypes.object.isRequired,
  genres: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
