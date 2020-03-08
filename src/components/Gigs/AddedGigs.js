import React, {Component, Fragment} from "react";
import AddedGigsItem from "./AddedGigsItem";
import LoadingModal from "../LoadingModal";

// TODO - refactor this so to inherit from a gig list component
class AddedGigs extends Component {

  componentDidMount() {
    if (!this.props.genres.objects) {
      this.props.actions.getGenres();
    }
    this.props.actions.getGigs({added:true});
  }

  render() {
    const {objects: genres} = this.props.genres;
    if (!genres) {
      return null;
    }

    const {
      objects,
      loading,
      error,
    } = this.props.gigs;
    const gigs = objects ? objects : [];

    return (
      <Fragment>
        <LoadingModal
          loading={loading}
          error={!!error}
        />
        {gigs.map(gig => <AddedGigsItem
          key={`added-gigs-item-${gig.id}`}
          gig={gig}
          genres={genres}
        />)}
      </Fragment>
    )
  }
}

export default AddedGigs;
