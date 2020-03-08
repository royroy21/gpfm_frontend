import React, {Component} from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GigsItem from "./GigItem";

class AddedGigsItem extends Component {

  render() {
    return (
      <GigsItem
        {...this.props}
        buttonItems={[
          {
            "key": "button-edit",
            "label": "edit",
            icon: <EditIcon />,
            onclick: () => {},
          },
          {
            "key": "button-delete",
            "label": "delete",
            icon: <DeleteIcon />,
            onclick: () => {},
          },
        ]}
      />
    );
  }
}

export default AddedGigsItem;
