import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import GPAvatar from "./GPAvatar";
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  handle: {
    color: "#F50057",
    marginTop: theme.spacing(2),
    flexGrow: 1,
    fontWeight: "bold",
  },
});

class UserHandleAvatarDisplay extends React.Component {

  render() {
    const { classes } = this.props;
    const { object } = this.props.user;
    const displayHandle = object ? object.handle : "";
    const avatarSrc = object ? object.avatar : "";
    return (
      <div style={{display: "flex"}}>
        <Typography className={classes.handle} variant="h6" noWrap>
          { displayHandle }
        </Typography>
        <GPAvatar
          src={avatarSrc}
        />
      </div>
    )
  }
}

export default withStyles(styles)(UserHandleAvatarDisplay);

UserHandleAvatarDisplay.propTypes = {
  user: PropTypes.object.isRequired,
};
