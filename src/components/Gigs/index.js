import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { gigsSearchRoute } from "../../settings/internalRoutes";
import GigsWrapper from "./wrapper";
import SearchGigs from "./SearchGigs";


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
      </Switch>
    )
  }
}

export default withRouter(GigsWrapper(Gigs));
