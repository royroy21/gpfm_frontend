import React from "react";
import { Route, Switch, withRouter } from 'react-router-dom';
import LoginForm from "./LoginForm";
import UserWrapper from "./wrapper";
import {accountRoute, loginRoute, registerRoute} from "../../settings/internalRoutes";
import RegisterForm from "./RegisterForm";
import AccountForm from "./AccountForm";

class User extends React.Component {

  render() {
    return (
      <Switch>
        <Route
          extact path={loginRoute}
          render={() =>
            <LoginForm
              actions={{
                postToken: this.props.actions.postToken,
                clearToken: this.props.actions.clearToken,
                clearUser: this.props.actions.clearUser,
              }}
              history={this.props.history}
              token={this.props.store.token}
              user={this.props.store.user}
              error={!!this.props.store.token.error || !!this.props.store.user.error}
              errors={this.props.store.token.error}
              loading={!!this.props.store.token.loading || !!this.props.store.user.loading}
              successMessage={"Logged In"}
              buttonLabel={"Login"}
            />
          }
        />
        <Route
          extact path={registerRoute}
          render={() =>
            <RegisterForm
              actions={{
                postRegister: this.props.actions.postRegister,
                clearRegister: this.props.actions.clearRegister,
              }}
              history={this.props.history}
              token={this.props.store.token}
              register={this.props.store.register}
              user={this.props.store.user}
              error={
                !!this.props.store.token.error
                || !!this.props.store.user.error
                || !!this.props.store.register.error
              }
              errors={this.props.store.register.error}
              loading={
                !! this.props.store.token.loading
                || !!this.props.store.user.loading
                || !!this.props.store.register.loading
              }
              successMessage={"Registered"}
              buttonLabel={"Register"}
            />
          }
        />{
          this.props.store.user.object ? (
          <Route
            extact path={accountRoute}
            render={() =>
              <AccountForm
                actions={{
                  patchUser: this.props.actions.patchUser,
                }}
                history={this.props.history}
                user={this.props.store.user}
                error={!!this.props.store.user.error}
                errors={this.props.store.user.error}
                loading={!!this.props.store.user.loading}
                successMessage={"Updated User"}
                buttonLabel={"Update User"}
              />
            }
          />
          ) : (
            null
          )}
      </Switch>
    )
  }
}

export default withRouter(UserWrapper(User));
