import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "../components/login/LoginPage";
import NotesPage from "../components/notes/NotesPage";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
        <Route path="/notes">
          <NotesPage></NotesPage>
        </Route>
      </Switch>
    </Router>
  );
}
