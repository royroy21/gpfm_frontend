import React from 'react';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import LoadingSpinner from "./LoadingSpinner";
import SuccessNotification from "./SuccessNotification";

class LoadingModal extends React.Component {

  state = {
    open: false,
    success: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.withSuccess
        && prevProps.loading
        && !this.props.loading
        && !this.props.error) {
      this.setState({success: true})
    }
    if (!prevProps.loading && this.props.loading) {
     this.setState({open: true})
    } else if (prevProps.loading && !this.props.loading && !this.props.error) {
      setTimeout(() => this.setState({open: false}), 1495)
    } else if (prevProps.loading && !this.props.loading && this.props.error) {
      this.setState({open: false})
    }
  }

  render() {
    return (
      <Modal disableAutoFocus open={this.state.open}>
        {this.state.success ? (
          <SuccessNotification successMessage={this.props.successMessage}/>
        ) : (
          <LoadingSpinner />
        )}
      </Modal>
    )
  }

}

export default LoadingModal;

LoadingModal.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  withSuccess: PropTypes.bool.isRequired,
  successMessage: PropTypes.string.isRequired,
};

LoadingModal.defaultProps = {
  withSuccess: false,
  successMessage: null,
};
