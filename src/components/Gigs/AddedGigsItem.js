import React, {Component, Fragment} from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GigsItem from "./GigItem";
import PropTypes from "prop-types";
import DeleteGigModal from "./DeleteGigModal";

class AddedGigsItem extends Component {

  state = {
    deleteGigModalOpen: false,
    editGigModalOpen: false,
  };

  handleDeleteGigModalClose = () => {

    console.log("hits 432");

    this.setState({deleteGigModalOpen: false})
  };

  handleDeleteGigModalOpen = () => {
    this.setState({deleteGigModalOpen: true})
  };

  render() {
    return (
      <Fragment>
        <GigsItem
          {...this.props}
          buttonItems={[
            {
              "key": "button-edit",
              "label": "edit",
              icon: <EditIcon />,
              onClick: () => {},
            },
            {
              "key": "button-delete",
              "label": "delete",
              icon: <DeleteIcon />,
              onClick: this.handleDeleteGigModalOpen,
            },
          ]}
        />
        {this.state.deleteGigModalOpen ? (
          <DeleteGigModal
            open={this.state.deleteGigModalOpen}
            handleClose={this.handleDeleteGigModalClose}
            deleteGigProps={this.props.deleteGigProps}
          />
        ) : null}
      </Fragment>
    );
  }
}

export default AddedGigsItem;

AddedGigsItem.propTypes = {
  id: PropTypes.number.isRequired,
  deleteGigProps: PropTypes.object.isRequired,
};
