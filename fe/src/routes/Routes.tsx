import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "../components/login/LoginPage";
import NotesPage from "../components/notes/NotesPage";
import Cookies from "js-cookie";

export function isLoggedIn() {
  return !!Cookies.get("token");
}

export default function Routes() {
  const loggedIn = isLoggedIn();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to={loggedIn ? "/notes" : "/login"}/>
        </Route>
        <Route exact path="/login">
          <LoginPage></LoginPage>
        </Route>
        <Route exact path="/notes">
          { loggedIn ? <NotesPage/> : <Redirect to="/login"/> }
        </Route>
      </Switch>
    </Router>
  );
}
