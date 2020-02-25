import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import {addGigRoute, gigsSearchRoute} from "../../settings/internalRoutes";
import GigsWrapper from "./wrapper";
import SearchGigs from "./SearchGigs";
import AddGig from "./AddGig";


class Gigs extends React.Component {

  render() {
    return (
      <Switch>
        <Route
          extact path={gigsSearchRoute}
          render={() =>
            <SearchGigs
              successMessage={"Updated Results"}
              withButton={false}
            />
          }
        />
        <Route
          extact path={addGigRoute}
          render={() =>
            <AddGig
              addGigFormProps={{
                actions: {
                  getGenres: this.props.actions.getGenres,
                  postGig: this.props.actions.postGig,
                },
                history: this.props.history,
                genres: this.props.store.genres,
                buttonLabel: "Add Gig",
                successMessage: "Gig Added",
                withMaxWidthLimit: true,
                gig: this.props.store.gig,
                user: this.props.store.user,
                error: !!this.props.store.gig.error,
                errors: this.props.store.gig.error,
                loading: this.props.store.gig.loading,
              }}
            />
          }
        />
      </Switch>
    )
  }
}

export default withRouter(GigsWrapper(Gigs));
