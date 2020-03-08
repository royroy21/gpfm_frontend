import React, {createRef, Fragment} from "react";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core";
import ForwardGeocodingWrapper from "./wrapper";
import PropTypes from "prop-types";
import Form from "../Form";
import Paper from "@material-ui/core/Paper";
import Downshift from "downshift";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Tooltip from "@material-ui/core/Tooltip";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    flexGrow: 1,
    position: 'relative',
  },
  error: {
    color: theme.palette.secondary.main,
  },
  formControl: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    minWidth: "60px",
  },
  inputsContainer: {
    display: "flex",
  },
  searchField: {
    position: 'relative',
    width: "100%",
  },
  searchButton: {
    marginRight: theme.spacing(1),
  },
  locationSuccessIndicator: {
    right: 0,
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(11),
    position: 'absolute',
  },
  locationErrorIndicator: {
    right: 0,
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(11),
    position: 'absolute',
    color: "yellow",
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
  MISSING_LOCATION_MESSAGE = "No location selected";
  LOCATION_PLACEHOLDER = "London";

  state = {
    formData: {
      q: "",

      // TODO - hard coded :/
      country: "GB",
    },
    selectedLocation: null,
    menuIsOpen: false,
  };

  componentDidMount() {
    const { objects: countries } = this.props.store.countries;
    if (!countries) {
      this.props.actions.getCountries();
    }

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
      q: event.target.value,
    };
    this.setState({formData: newFormData})
  };

  handleCountryChange = (event) => {
    const { formData } = this.state;
    const newFormData = {
      ...formData,
      q: "",
      country: event.target.value,
    };
    this.setState({
      ...this.state,
      formData: newFormData,
      selectedLocation: null,
    })
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

  renderCountryValue = (value) => {
    return value
  };

  getFields() {
    const { objects: countries } = this.props.store.countries;
    if (!countries) {
      return null;
    }
    const { classes } = this.props;
    const { objects: locations } = this.props.store.forwardGeocoding;
    return (
      <Fragment>
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
              <div className={classes.inputsContainer}>
                <Button
                  className={classes.searchButton}
                  variant={"contained"}
                  type={"submit"}
                  color={"secondary"}
                >
                  <LocationSearchingIcon />
                </Button>
                <TextField
                  {...getInputProps()}
                  className={classes.searchField}
                  id={"get-location"}
                  label={this.DEFAULT_LABEL}
                  variant={"outlined"}
                  onChange={this.handleChange}
                  value={this.state.formData.q}
                  placeholder={this.LOCATION_PLACEHOLDER}
                />
                {this.state.selectedLocation ? (
                  <ThumbUpIcon
                    className={classes.locationSuccessIndicator}
                  />
                ) : (
                  <Tooltip title={this.MISSING_LOCATION_MESSAGE}>
                    <WarningRoundedIcon
                      className={classes.locationErrorIndicator}
                    />
                  </Tooltip>
                )}
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    renderValue={this.renderCountryValue}
                    id="select-country"
                    value={this.state.formData.country}
                    onChange={this.handleCountryChange}
                    MenuProps={{style: {maxHeight: '500px'}}}
                  >
                  {countries.map(country => (
                    <MenuItem
                      key={country.code}
                      value={country.code}
                    >
                      {`${country.name} (${country.code})`}
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </div>
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
        {this.props.extraErrors.length ? (
          this.props.extraErrors.map(error => <p className={classes.error}>{error}</p>)
        ) : null}
      </Fragment>
    )
  }
}

export default withStyles(styles)(ForwardGeocodingWrapper(LocationPickerForm));

LocationPickerForm.defaultProps = {
  withButton: false,
  extraErrors: [],
};

LocationPickerForm.propTypes = {
  updateLocationField: PropTypes.func.isRequired,
  extraErrors: PropTypes.array,
};
