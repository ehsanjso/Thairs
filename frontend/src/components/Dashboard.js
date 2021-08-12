import React, { useState } from "react";
import { history } from "../routers/AppRouter";
import { Router, Route, Switch } from "react-router";
import { QuestionProvider } from "../contexts/QuestionProvider";
import { useSelector } from "react-redux";
import RecommenderDashboard from "./RecommenderDashboard";
import { SocketProvider } from "../contexts/SocketProvider";
import { GroupProvider } from "../contexts/GroupProvider";
import Group from "../components/Group";
import Lobby from "../components/Lobby";

export default function Dashboard() {
  const userToken = useSelector((state) => state.auth.token);

  return (
    <SocketProvider userToken={userToken}>
      <GroupProvider>
        <QuestionProvider>
          <Switch>
            <Route
              path="/recommender"
              component={RecommenderDashboard}
              exact={true}
            />
            <Route path="/group" component={Group} exact={true} />
            <Route path="/" component={Lobby} exact={true} />
          </Switch>
        </QuestionProvider>
      </GroupProvider>
    </SocketProvider>
  );
}
