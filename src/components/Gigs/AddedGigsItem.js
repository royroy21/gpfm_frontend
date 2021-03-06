import React, {Component, Fragment} from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {withStyles} from "@material-ui/core";
import Image from "../SingleImage/Image";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  buttonText: {
    marginLeft: theme.spacing(1),
  },
  buttonContainer: {
    textAlign: "right",
  },
  buttonEdit: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: "125px",
    maxHeight: "45px",
  },
  buttonDelete: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: "125px",
    maxHeight: "45px",
  },
  container: {
    display: "flex",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chips: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "90%",
  },
  chipsAndButtonsContainer: {
    display: "flex",
    width: "100%",
  },
  genre: {
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: "10px",
    height: "18px",
    margin: "5px 5px 5px 0",
    padding: "5px",
    width: "fit-content",
    fontWeight: "bold",
  },
  title: {
    color: theme.palette.secondary.main,
  },
});

class AddedGigsItem extends Component {

  getChips() {
    const { classes, gig } = this.props;
    const genreIds = this.props.gig.genres;
    return (
      <div style={{width: "80%"}}>
        {<Chip
          className={classes.chip}
          label={"Gig date: " + moment(gig.start_date).format('LL')}
        />}
        {<Chip
          className={classes.chip}
          label={"Date posted: " + moment(gig.date_created).format('LL')}
        />}
        <div className={classes.chips}>
          {this.props.genres.filter(genre => genreIds
            .includes(genre.id))
            .map((genre, key) => <Chip
              key={key}
              className={classes.chip}
              label={genre.name + "  "}
            />)}
        </div>
      </div>
    )
  }

  getButtons() {
    const { classes } = this.props;
    return (
      <div className={classes.buttonContainer}>
        <Button
          className={classes.buttonEdit}
          variant={"outlined"}
          >
          <EditIcon />
          <span className={classes.buttonText}>{"edit"}</span>
        </Button>
        <Button
          className={classes.buttonDelete}
          variant={"outlined"}
          >
          <DeleteIcon />
          <span className={classes.buttonText}>{"delete"}</span>
        </Button>
      </div>
    )
  }

  render() {
    const {
      classes,
      gig,
    } = this.props;

    return (
        <Fragment>
          <div className={classes.container}>
            <Image
              size={"small"}
              src={gig.image}
            />
            <div style={{width: "95%"}}>
              <h3>
                <span className={classes.title}>{gig.title}</span>
                {` @${gig.venue}, ${gig.location_name}`}
              </h3>
              <p style={{minWidth: "90%"}}>{gig.description}</p>
              <div className={classes.chipsAndButtonsContainer}>
                {this.getChips()}
                {this.getButtons()}
              </div>
            </div>
          </div>
          <Divider />
        </Fragment>
    )
  }
}

export default withStyles(styles)(AddedGigsItem);
