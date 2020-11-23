import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HelpPage } from "../components/HelpPage/HelpPage";
import { ZapierHelpPage } from "../components/HelpPage/ZapierHelpPage/ZapierHelpPage";
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
        <Route exact path="/help">
          <HelpPage />
        </Route>
        <Route exact path="/help/zapier">
          <ZapierHelpPage />
        </Route>
      </Switch>
    </Router>
  );
}
