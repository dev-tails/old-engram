import React from "react";
import { useLocation } from "react-router";
import "./Header.scss";

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = (props) => {
  const location = useLocation();

  let title = "BrainStorm";
  if (location.pathname === "/notes") {
    title = "All";
  }

  return (
    <div className="header-wrapper">
      <div className="header">
        <div className="left-button">{/* <button>&lt;</button> */}</div>
        <div className="title">{title}</div>
        <div className="right-button">{/* <button>...</button> */}</div>
      </div>
    </div>
  );
};
