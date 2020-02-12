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
                },
                history: this.props.history,
                genres: this.props.store.genres,
                buttonLabel: "Add Gig",
                successMessage: "Gig Added",
                withMaxWidthLimit: true,
              }}
            />
          }
        />
      </Switch>
    )
  }
}

export default withRouter(GigsWrapper(Gigs));
