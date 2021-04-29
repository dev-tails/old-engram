import moment from "moment";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";

import { DebugNotesPage } from "../components/DebugNotesPage/DebugNotesPage";
import { Header } from "../components/header/Header";
import { HelpPage } from "../components/HelpPage/HelpPage";
import { ZapierHelpPage } from "../components/HelpPage/ZapierHelpPage/ZapierHelpPage";
import { HomePage } from "../components/HomePage/HomePage";
import LoginPage, { LoginPagePath } from "../components/login/LoginPage";
import { LogoutPage } from "../components/LogoutPage/LogoutPage";
import { LogPage } from "../components/LogPage/LogPage";
import { EditNotePage } from "../components/notes/EditNotePage/EditNotePage";
import { PagesPage } from "../components/PagesPage/PagesPage";
import {
  PrivacyPolicyPage,
  PrivacyPolicyPagePath,
} from "../components/PrivacyPolicyPage/PrivacyPolicyPage";
import { SettingsPage } from "../components/SettingsPage/SettingsPage";
import SignupPage, {
  SignupPagePath,
} from "../components/SignupPage/SignupPage";
import { hasLocalDevice } from "../DeviceApi";
import { isPluginEnabled, PluginName } from "../FeatureFlags";
import {
  TermsOfServicePage,
  TermsOfServicePagePath,
} from "../TermsOfServicePage/TermsOfServicePage";
import { getMe } from "../UsersApi";

function getStartDate(date: Date, dateRangeValue: string) {
  switch (dateRangeValue) {
    // case "Before":
    //   return null;
    case "Since":
    case "Day":
      return moment(date).startOf("day").toDate();
    case "Fortnight":
    case "Week":
      return moment(date).startOf("week").toDate();
    case "Month":
      return moment(date).startOf("month").toDate();
    case "Quarter":
      return moment(date).startOf("quarter").toDate();
    case "Year":
      return moment(date).startOf("year").toDate();
    default:
      throw new Error(`Unexpected value: ${dateRangeValue}`);
  }
}

function getEndDate(date: Date, dateRangeValue: string) {
  const startDate = getStartDate(date, dateRangeValue);
  let momentToReturn = moment(startDate);
  switch (dateRangeValue) {
    // case "Since":
    //   return null;
    case "Before":
    case "Day":
      break;
    case "Week":
      momentToReturn = momentToReturn.endOf("week");
      break;
    case "Fortnight":
      momentToReturn = momentToReturn.add(2, "week");
      break;
    case "Month":
      momentToReturn = momentToReturn.endOf("month");
      break;
    case "Quarter":
      momentToReturn = momentToReturn.endOf("quarter");
      break;
    case "Year":
      momentToReturn = momentToReturn.endOf("year");
      break;
    default:
      throw new Error(`Unexpected value: ${dateRangeValue}`);
  }
  return momentToReturn.endOf("day").toDate();
}

export default function Routes() {
  const location = useLocation();

  const [date, setDate] = useState(moment().startOf("day").toDate());
  const [dateRangeValue, setDateRangeValue] = useState("Day");
  const [activeParentId, setActiveParentId] = useState<
    string | null | undefined
  >(null);
  const [workspaceName, setWorkspaceName] = useState<string | null | undefined>(
    null
  );

  const startDate = getStartDate(date, dateRangeValue);
  const endDate = getEndDate(date, dateRangeValue);

  let title = "";
  let isPublicRoute = true;
  switch (location.pathname) {
    case "/signup":
    case "/login":
      title = "engram";
      break;
    case TermsOfServicePagePath:
      title = "Terms of Service";
      break;
    case PrivacyPolicyPagePath:
      title = "Privacy Policy";
      break;
    case SignupPagePath:
    case LoginPagePath:
      break;
    case "/help":
    case "/help/zapier":
      title = "Help";
      break;
    case "/pages":
      title = "Pages";
      isPublicRoute = false;
      break;
    default:
      isPublicRoute = false;
      break;
  }

  const handleDateChanged = (date: Date) => {
    setDate(date);
  };

  const handleDateRangeChanged = (dateRange: string) => {
    setDateRangeValue(dateRange);
  };

  const handleWorkspaceSelected = (
    id: string | null | undefined,
    name?: string
  ) => {
    setActiveParentId(id);
    setWorkspaceName(name);
  };

  if (workspaceName) {
    title = workspaceName;
  }

  return (
    <>
      <Header
        title={title}
        isPublicRoute={isPublicRoute}
        onWorkspaceSelected={handleWorkspaceSelected}
        activeParentId={activeParentId}
      />
      <Switch>
        <Route exact={true} path="/">
          {isPluginEnabled(PluginName.PLUGIN_DASHBOARD) ? (
            <Redirect to="/dashboard" />
          ) : (
            <Redirect to="/daily" />
          )}
        </Route>
        <AuthenticatedRoute exact={true} path="/quick-capture">
          <LogPage />
        </AuthenticatedRoute>
        <Route exact path="/daily">
          <LogPage date={date} onDateChanged={handleDateChanged} />
        </Route>
        {isPluginEnabled(PluginName.PLUGIN_DASHBOARD) ? (
          <AuthenticatedRoute exact={true} path="/dashboard">
            <HomePage
              dateRangeValue={dateRangeValue}
              date={date}
              startDate={startDate}
              endDate={endDate}
              activeParentId={activeParentId}
              onDateChange={handleDateChanged}
              onDateRangeChange={handleDateRangeChanged}
            />
          </AuthenticatedRoute>
        ) : null}
        <AuthenticatedRoute exact={true} path="/pages">
          <PagesPage />
        </AuthenticatedRoute>
        <Route exact path="/notes/:id">
          <EditNotePage />
        </Route>
        <Route exact path={LoginPagePath}>
          <LoginPage />
        </Route>
        <Route exact path={SignupPagePath}>
          <SignupPage />
        </Route>
        <Route exact path="/logout">
          <LogoutPage />
        </Route>
        <Route exact path="/settings">
          <SettingsPage />
        </Route>
        <Route exact path="/help">
          <HelpPage />
        </Route>
        <Route exact path="/settings/zapier">
          <ZapierHelpPage />
        </Route>
        <Route exact path={PrivacyPolicyPagePath}>
          <PrivacyPolicyPage />
        </Route>
        <Route exact path={TermsOfServicePagePath}>
          <TermsOfServicePage />
        </Route>
        <AuthenticatedRoute exact path="/debug/notes">
          <DebugNotesPage />
        </AuthenticatedRoute>
        <Redirect to="/" />
      </Switch>
    </>
  );
}

const AuthenticatedRoute: React.FC<{ exact: boolean; path: string }> = ({
  children,
  ...rest
}) => {
  const [isLocalUser, setIsLocalUser] = useState(false);
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkLocalUser() {
      setIsLocalUser(await hasLocalDevice());
      try {
        await getMe();
        setIsAuthenticatedUser(true);
      } catch (err) {}
      setLoading(false);
    }
    checkLocalUser();
  });

  if (loading) {
    return null;
  }

  const hasLocalOrAuthenticatedAccount = isLocalUser || isAuthenticatedUser;

  return (
    <Route
      {...rest}
      render={() => {
        return hasLocalOrAuthenticatedAccount === true ? (
          children
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};
