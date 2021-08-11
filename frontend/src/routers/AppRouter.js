import React from "react";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import Lobby from "../components/Lobby";
import Group from "../components/Group";
import NotFound from "../components/NotFound";

export const history = createBrowserHistory();

const AppRouter = (props) => {
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute path="/login" component={Login} exact={true} />
        <PrivateRoute path="/" component={Lobby} exact={true} />
        <PrivateRoute path="/recommender" component={Dashboard} exact={true} />
        <PrivateRoute path="/group" component={Group} exact={true} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
