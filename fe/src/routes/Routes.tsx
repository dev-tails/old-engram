import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { AgendaViewPage } from "../components/AgendaViewPage/AgendaViewPage";
import { HelpPage } from "../components/HelpPage/HelpPage";
import { ZapierHelpPage } from "../components/HelpPage/ZapierHelpPage/ZapierHelpPage";
import LoginPage from "../components/login/LoginPage";
import { LogoutPage } from "../components/LogoutPage/LogoutPage";
import NotesPage from "../components/notes/NotesPage";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/daily" />
        </Route>
        <Route exact path="/collections/agenda">
          <AgendaViewPage />
        </Route>
        <Route exact path="/archive">
          <NotesPage />
        </Route>
        <Route exact path="/daily">
          <NotesPage daily={true} />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/logout">
          <LogoutPage />
        </Route>
        <Route exact path="/help">
          <HelpPage />
        </Route>
        <Route exact path="/help/zapier">
          <ZapierHelpPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
