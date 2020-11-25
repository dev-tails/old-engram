import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { logout } from "../../UsersApi";

type LogoutPageProps = {};

export const LogoutPage: React.FC<LogoutPageProps> = (props) => {
  const history = useHistory();

  useEffect(() => {
    const navigateToLoginPage = history.push.bind(this, "/login");
    logout().then(navigateToLoginPage).catch(navigateToLoginPage);
  });

  return <div className="logout-page"></div>;
};
