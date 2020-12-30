import moment from 'moment';
import React, { useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import { Header } from '../components/header/Header';
import { HelpPage } from '../components/HelpPage/HelpPage';
import { ZapierHelpPage } from '../components/HelpPage/ZapierHelpPage/ZapierHelpPage';
import { HomePage } from '../components/HomePage/HomePage';
import LoginPage, { LoginPagePath } from '../components/login/LoginPage';
import { LogoutPage } from '../components/LogoutPage/LogoutPage';
import { EditNotePage } from '../components/notes/EditNotePage/EditNotePage';

export default function Routes() {
  const location = useLocation();

  const [date, setDate] = useState(moment().startOf("day").toDate());
  const [dateRangeValue, setDateRangeValue] = useState("D");

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

  const handleDateRangeChanged = (dateRange: string) => {
    setDateRangeValue(dateRange);
  };

  return (
    <>
      <Header
        title={title}
        date={date}
        onDateChange={handleDateChanged}
        dateRangeValue={dateRangeValue}
        onDateRangeChange={handleDateRangeChanged}
      />
      <Switch>
        <Route exact path="/">
          <HomePage date={date} dateRangeValue={dateRangeValue} />
        </Route>
        <Route exact path="/notes/:id">
          <EditNotePage />
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
