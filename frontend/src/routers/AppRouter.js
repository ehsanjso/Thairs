import React from "react";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import NotFound from "../components/NotFound";

export const history = createBrowserHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute path="/login" component={Login} exact={true} />
        <PrivateRoute path="/" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
