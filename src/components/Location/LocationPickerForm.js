import React, {Fragment} from "react";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core";
import ForwardGeocodingWrapper from "./wrapper";
import PropTypes from "prop-types";
import Form from "../Form";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  container: {
    display: "flex",
    margin: `${theme.spacing(3)}px 0 0 0`,
  },
  searchField: {
    width: "100%",
  },
  multipleLocationsContainer: {
    position: 'relative',
  },
  multipleLocationsPaper: {
    position: 'absolute',
    zIndex: 2,
    left: 0,
    right: 0,
  },
  multipleLocationsList: {
    maxHeight: "300px",
    overflowY: "scroll",
  },
  noLocationsFoundError: {
    color: theme.palette.secondary.main,
  },
});

class LocationPickerForm extends Form {

  DEFAULT_LABEL = "Gig Location";

  state = {
    formData: {
      q: "",

      // TODO - hard coded :/
      country: "gb",
    },
    selectedLocation: null,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { objects } = this.props.store.forwardGeocoding;
    if (prevProps.store.forwardGeocoding.loading && objects && objects.length) {
      this.setLocation(objects);
    }
    if (prevProps.store.forwardGeocoding.loading && (!objects || !objects.length) && prevState.selectedLocation !== null) {
      this.setState({selectedLocation: null});
      this.props.updateLocationField(null);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.actions.getForwardGeocoding(this.state.formData);
  };

  handleChange = (event) => {
    const { formData } = this.state;
    const newFormData = {
      ...formData,
      "q": event.target.value,
    };
    this.setState({formData: newFormData})
  };

  setLocation = (locations) => {
    const location = locations[0];
    if (this.state.formData.q === location.name) {
      return null;
    }
    if (locations.length === 1) {
      this.setState(state => ({
        formData: {
          ...state.formData,
          "q": location.name,
        },
        selectedLocation: location,
      }));
      this.props.updateLocationField(location);
    } else {
      this.setState(state => ({
        formData: {
          ...state.formData,
          "q": "",
        },
        selectedLocation: null,
      }));
      this.props.updateLocationField(null);
    }
  };

  getMultipleLocationsList() {
    if (this.state.selectedLocation) {
      return null
    }
    const { classes } = this.props;
    const { objects } = this.props.store.forwardGeocoding;
    if (objects && objects.length > 1) {
      return (
        <div className={classes.multipleLocationsContainer}>
          <Paper className={classes.multipleLocationsPaper}>
            <List
              component={"nav"}
              className={classes.multipleLocationsList}
            >
              {objects.map(location => (
                <ListItem
                  button
                  key={location.name}
                  onClick={() => this.setLocation([location])}
                >
                  <ListItemText
                    secondary={location.name}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </div>
      )
    }
  }

  showNoLocationsFoundError() {
    const { objects } = this.props.store.forwardGeocoding;
    const { classes } = this.props;
    if (!objects || !objects.length) {
      return (
        <p className={classes.noLocationsFoundError}>
          {"No Locations Found"}
        </p>
      )
    }
  };

  getFields() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.container}>
          <TextField
            className={classes.searchField}
            id={"get-location"}
            label={this.DEFAULT_LABEL}
            variant={"outlined"}
            onChange={this.handleChange}
            value={this.state.formData.q}
            // TODO - implement this?
            onKeyPress={this.onInputFieldKeyPress}
          />
        </div>
        {this.getMultipleLocationsList()}
        {this.showNoLocationsFoundError()}
      </Fragment>
    )
  }
}

export default withStyles(styles)(ForwardGeocodingWrapper(LocationPickerForm));

LocationPickerForm.defaultProps = {
  withButton: false,
};

LocationPickerForm.propTypes = {
  updateLocationField: PropTypes.func.isRequired,
};
