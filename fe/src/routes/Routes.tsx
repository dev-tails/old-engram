import moment from 'moment';
import React, { useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import { AgendaViewPage } from '../components/AgendaViewPage/AgendaViewPage';
import { Header } from '../components/header/Header';
import { HelpPage } from '../components/HelpPage/HelpPage';
import { ZapierHelpPage } from '../components/HelpPage/ZapierHelpPage/ZapierHelpPage';
import LoginPage, { LoginPagePath } from '../components/login/LoginPage';
import { LogoutPage } from '../components/LogoutPage/LogoutPage';
import { EditNotePage } from '../components/notes/EditNotePage/EditNotePage';
import NotesPage from '../components/notes/NotesPage';

export default function Routes() {
  const location = useLocation();

  const [date, setDate] = useState(moment().startOf("day").toDate());

  let title = date.toLocaleDateString();
  let showArrows = true;
  switch (location.pathname) {
    case LoginPagePath:
      title = "engram";
      showArrows = false;
      break;
    case "/help":
    case "/help/zapier":
      title = "Help";
      showArrows = false;
      break;
    default:
      break;
  }

  const handleArrowClicked = (direction: string) => {
    if (direction === "left") {
      setDate(moment(date).subtract(1, "d").toDate());
    } else {
      setDate(moment(date).add(1, "d").toDate());
    }
  };

  return (
    <>
      <Header
        title={title}
        onArrowClicked={handleArrowClicked}
        showArrows={showArrows}
      />
      <Switch>
        <Route exact path="/">
          <Redirect to="/daily" />
        </Route>
        <Route exact path="/notes/:id">
          <EditNotePage />
        </Route>
        <Route exact path="/collections/agenda">
          <AgendaViewPage date={date} />
        </Route>
        <Route exact path="/archive">
          <NotesPage />
        </Route>
        <Route exact path="/daily">
          <NotesPage date={date} />
        </Route>
        <Route exact path={LoginPagePath}>
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
    </>
  );
}
