import React, {Fragment} from 'react';
import {withStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ClearIcon from '@material-ui/icons/Clear';
import SyncIcon from '@material-ui/icons/Sync';
import GPAvatar from "../UserHandleAvatarDisplay/GPAvatar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import PropTypes from "prop-types";
import Form from "../Form";
import {getFieldError} from "../../utils/form";

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
    },
    forceBlankImage: false,
  };

  imageInput = React.createRef();

  componentDidMount() {
    const formData = {
      handle: this.props.user.object.handle,
      avatar: null,
      bio: this.props.user.object.bio,
    };
    this.setState({formData});
    this.setState({forceBlankImage: !this.props.user.object.avatar})
  };

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

  getFields (){
    const { classes } = this.props;
    const handleError = getFieldError(this.props.user.error, "handle");
    const avatarSrc = this.getAvatarSrc();

    return (
      <Fragment>
        <TextField
          error={!!handleError}
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
        <TextField
          error={!!handleError}
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
      </Fragment>
    )
  }
}

export default withStyles(styles)(AccountForm)

AccountForm.propTypes = {
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
