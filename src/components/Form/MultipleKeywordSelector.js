import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    maxHeight: '225px',
    overflow: 'scroll',
    position: 'absolute',
    zIndex: 2,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: '100%',
  },
});

class MultipleKeywordSelector extends React.Component {

  optionsPaperRef = createRef();

  state = {
    inputValue: '',
    selectedItem: [],
  };

  componentDidMount() {
    this.setState({selectedItem: this.props.initialSelectedItems});
  };

  setInputValue = (value) => this.setState({inputValue: value});
  setSelectedItem = (value) => this.setState({selectedItem: value});

  handleKeyDown = (event) => {
    if (this.state.selectedItem.length && !this.state.inputValue.length && event.key === 'Backspace') {
      this.setSelectedItem(this.state.selectedItem.slice(0, this.state.selectedItem.length - 1));
    }
  };

  handleInputChange = (event) => {
    this.setInputValue(event.target.value);
  };

  handleChange = (item) => {
    if (!item) {
      return
    }
    let newSelectedItem = [...this.state.selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    this.setInputValue('');
    this.setSelectedItem(newSelectedItem);
    this.props.handleFormChange(newSelectedItem);
  };

  handleDelete = (item) => {
    const newSelectedItem = [...this.state.selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    this.setSelectedItem(newSelectedItem);
    this.props.handleFormChange(newSelectedItem);
  };

  optionNames = [];

  scrollToHighlightedOption(optionName) {
    const y = this.optionNames.indexOf(optionName) * 48;
    this.optionsPaperRef.current.scrollTo(0, y);
  };

  getOptions = (value) => {
    const cleanedValue = value.trim().toLowerCase();
    const sortFunc = (x,y) => x.name.startsWith(cleanedValue) ? -1 : y.name.startsWith(cleanedValue) ? 1 : 0;
    const options = this.props.options.filter(
      option => option.name.toLowerCase().includes(cleanedValue)).sort(sortFunc).slice(0, 20);
    this.optionNames = options.map(option => option.name);
    return options;
  };

  renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;
    return (
      <TextField
        InputProps={{
          inputRef: ref,
          classes: {
            root: classes.inputRoot,
            input: classes.inputInput,
          },
          ...InputProps,
        }}
        {...other}
      />
    );
  }

  renderOptions(optionsProps) {
    const { option, index, itemProps, highlightedIndex, selectedItem } = optionsProps;
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(option.name) > -1;

    if (isHighlighted) {
      this.scrollToHighlightedOption(option.name)
    }
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

  render() {
    const { classes } = this.props;
    return (
      <div style={{width: "100%"}}>
        <Downshift
          id="downshift-multiple"
          inputValue={this.state.inputValue}
          onChange={this.handleChange}
          selectedItem={this.state.selectedItem}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            isOpen,
            inputValue: inputValue2,
            selectedItem: selectedItem2,
            highlightedIndex,
          }) => {
            const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
              onKeyDown: this.handleKeyDown,
              placeholder: this.state.selectedItem.length ? this.props.placeholderHasItems : this.props.placeholderNoItems,
            });

            return (
              <div className={classes.container}>
                {this.renderInput({
                  fullWidth: true,
                  classes,
                  label: this.props.label,
                    InputLabelProps: getLabelProps(),
                  InputProps: {
                    startAdornment: this.state.selectedItem.map(item => (
                      <Chip
                        key={item}
                        tabIndex={-1}
                        label={item}
                        className={classes.chip}
                        onDelete={() => this.handleDelete(item)}
                      />
                    )),
                    onBlur,
                    onChange: event => {
                      this.handleInputChange(event);
                      onChange(event);
                    },
                    onFocus,
                  },
                  inputProps,
                })}

                {isOpen ? (
                  <Paper className={classes.paper} ref={this.optionsPaperRef} square>
                    {this.getOptions(inputValue2).map((option, index) =>
                      this.renderOptions({
                        option,
                        index,
                        itemProps: getItemProps({
                          item: option.name,
                          id: `downshift-multiple-item-${option.id}`,
                        }),
                        highlightedIndex,
                        selectedItem: selectedItem2,
                      }),
                    )}
                  </Paper>
                ) : null}
              </div>
            );
          }}
        </Downshift>
      </div>
    );
  };
}

MultipleKeywordSelector.propTypes = {
  options: PropTypes.array.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  initialSelectedItems: PropTypes.array.isRequired,
  placeholderHasItems: PropTypes.string.isRequired,
  placeholderNoItems: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

MultipleKeywordSelector.defaultProps = {
  initialSelectedItems: [],
  placeholderHasItems: "",
  placeholderNoItems: "",
  label: "",
};

export default withStyles(styles)(MultipleKeywordSelector);
