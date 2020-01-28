import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { gigsSearchRoute } from "../../settings/internalRoutes";
import GigsWrapper from "./wrapper";


class Gigs extends React.Component {

  render() {

    console.log("here! 123");

    return (
      <Switch>
        <Route
          extact path={gigsSearchRoute}
          render={() =>
            <p>{"gigs"}</p>
          }
        />
      </Switch>
    )
  }
}

export default withRouter(GigsWrapper(Gigs));
