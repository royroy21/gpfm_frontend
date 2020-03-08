import React, {Component, Fragment} from "react";
import LoadingModal from "../LoadingModal";
import PropTypes from "prop-types";

class Gigs extends Component {

  GigItem = null;

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
        {gigs.map(gig => <this.GigItem
          key={`added-gigs-item-${gig.id}`}
          gig={gig}
          genres={genres}
        />)}
      </Fragment>
    )
  }
}

export default Gigs;

Gigs.propTypes = {
  actions: PropTypes.object.isRequired,
  genres: PropTypes.object.isRequired,
  gigs: PropTypes.object.isRequired,
};
