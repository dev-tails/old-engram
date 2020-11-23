import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../header/Header";

type HelpPageProps = {};

export const HelpPage: React.FC<HelpPageProps> = (props) => {
  return (
    <div className="help-page">
      <Header title="Help" />
      <div className="container" style={{ marginTop: 64 }}>
        <Link to={"/help/zapier"}>Zapier</Link>
      </div>
    </div>
  );
};
