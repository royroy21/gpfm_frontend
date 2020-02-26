import React, {createRef} from "react";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core";
import ForwardGeocodingWrapper from "./wrapper";
import PropTypes from "prop-types";
import Form from "../Form";
import Paper from "@material-ui/core/Paper";
import Downshift from "downshift";
import MenuItem from "@material-ui/core/MenuItem";

// TODO -
// add button for start get location logic
// add indication to user if location is selected or not
// add country dropdown
// (nice to have) add autocomplete from locations api

const styles = theme => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    flexGrow: 1,
    position: 'relative',
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
  paper: {
    maxHeight: '225px',
    overflow: 'scroll',
    position: 'absolute',
    zIndex: 2,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
    overflowX: 'hidden',
  },
});

class LocationPickerForm extends Form {

  optionsPaperRef = createRef();

  DEFAULT_LABEL = "Gig Location";

  state = {
    formData: {
      q: "",

      // TODO - hard coded :/
      country: "gb",
    },
    selectedLocation: null,
    menuIsOpen: false,
  };

  componentDidMount() {
    const { object: location } = this.props.store.location;
    if (location) {
      this.setLocation([location]);
    }
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { objects: locations } = this.props.store.forwardGeocoding;
    if (
      !this.state.menuIsOpen
      && !this.state.formData.q
      && locations && locations.length > 1
    ) {
      this.setState({menuIsOpen: true})
    }
    const { object: location } = this.props.store.location;
    if (location) {
      this.props.updateLocationField(location.id);
      if (this.state.menuIsOpen) {
        this.setState({menuIsOpen: false});
        this.props.actions.clearForwardGeocoding()
      }
    }
    const { objects } = this.props.store.forwardGeocoding;
    if (prevProps.store.forwardGeocoding.loading && objects && objects.length) {
      this.setLocation(objects);
    }
    if (
      prevProps.store.forwardGeocoding.loading
      && (!objects || !objects.length)
      && prevState.selectedLocation !== null
    ) {
      this.setState({selectedLocation: null});
      this.props.updateLocationField(null);
      this.props.actions.clearLocation();
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
    if (!location){
      return null;
    }
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
      this.props.actions.postLocation(location);
    } else {
      this.setState(state => ({
        formData: {
          ...state.formData,
          "q": "",
        },
        selectedLocation: null,
      }));
      this.props.actions.clearLocation()
    }
  };

  renderOptions(optionsProps) {
    const {
      option,
      index,
      itemProps,
      highlightedIndex,
      selectedItem,
    } = optionsProps;
    const isHighlighted = highlightedIndex === index;
    if (isHighlighted) {
      this.scrollToHighlightedOption(option.name)
    }
    const isSelected = selectedItem ? selectedItem.name === option.name : false;
    return (
      <MenuItem
        {...itemProps}
        key={option.name}
        selected={isHighlighted}
        component={"div"}
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {option.name}
      </MenuItem>
    );
  }

  scrollToHighlightedOption(optionName) {
    const { objects: locations } = this.props.store.forwardGeocoding;
    const y = locations.map(location => location.name).indexOf(optionName) * 48;
    this.optionsPaperRef.current.scrollTo(0, y);
  };

  onOuterClick = () => {
    this.props.actions.clearForwardGeocoding();
    this.setState({menuIsOpen: false});
  };

  escFunction = (event) => {
    if(event.keyCode === 27) {
      this.onOuterClick();
    }
  };

  getFields() {
    const { classes } = this.props;
    const { objects: locations } = this.props.store.forwardGeocoding;
    return (
      <Downshift
        onChange={location => this.setLocation([location])}
        itemToString={item => (item ? item.name : '')}
        isOpen={this.state.menuIsOpen}
        onOuterClick={this.onOuterClick}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          highlightedIndex,
          selectedItem,
        }) => (
          <div className={classes.container}>
            <TextField
              {...getInputProps()}
              className={classes.searchField}
              id={"get-location"}
              label={this.DEFAULT_LABEL}
              variant={"outlined"}
              onChange={this.handleChange}
              value={this.state.formData.q}
            />
            {isOpen ? (
              <Paper
                className={classes.paper}
                ref={this.optionsPaperRef}
                square
              >
                {(locations || []).map((option, index) =>
                  this.renderOptions({
                    option,
                    index,
                    itemProps: getItemProps({
                      item: option,
                      id: `downshift-multiple-item-${option.name}`,
                    }),
                    highlightedIndex,
                    selectedItem,
                  }),
                )}
              </Paper>): null}
          </div>
        )}
      </Downshift>
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
