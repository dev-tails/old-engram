import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomePage } from "../components/HomePage";
import LoginPage from "../components/login/LoginPage";
import NotesPage from "../components/notes/NotesPage";
import { ViewWidgetPage } from "../components/ViewWidgetPage";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/widgets/:widgetId">
          <ViewWidgetPage />
        </Route>
        <Route exact path="/notes">
          <NotesPage />
        </Route>
      </Switch>
    </Router>
  );
}
