import moment from 'moment';
import React, { useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import { AgendaViewPage } from '../components/AgendaViewPage/AgendaViewPage';
import { Header } from '../components/header/Header';
import { HelpPage } from '../components/HelpPage/HelpPage';
import { ZapierHelpPage } from '../components/HelpPage/ZapierHelpPage/ZapierHelpPage';
import { HomePage } from '../components/HomePage/HomePage';
import LoginPage, { LoginPagePath } from '../components/login/LoginPage';
import { LogoutPage } from '../components/LogoutPage/LogoutPage';
import { EditNotePage } from '../components/notes/EditNotePage/EditNotePage';
import NotesPage from '../components/notes/NotesPage';
import { isMobileUserAgent } from '../utils/UserAgentUtils';

export default function Routes() {
  const location = useLocation();

  const [date, setDate] = useState(moment().startOf("day").toDate());

  let title = "";
  switch (location.pathname) {
    case LoginPagePath:
      title = "engram";
      break;
    case "/help":
    case "/help/zapier":
      title = "Help";
      break;
    default:
      break;
  }

  const handleDateChanged = (date: Date) => {
    setDate(date);
  };

  return (
    <>
      <Header title={title} date={date} onDateChange={handleDateChanged} />
      <Switch>
        <Route exact path="/">
          {isMobileUserAgent() ? (
            <Redirect to="/daily" />
          ) : (
            <HomePage date={date} />
          )}
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
