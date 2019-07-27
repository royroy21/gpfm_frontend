import React from 'react';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import LoadingSpinner from "./LoadingSpinner";

class LoadingModal extends React.Component {

  render() {
    return (
      <Modal disableAutoFocus open={this.props.loading}>
        <LoadingSpinner />
      </Modal>
    )
  }

}

export default LoadingModal;

LoadingModal.propTypes = {
  loading: PropTypes.bool.isRequired,
};
