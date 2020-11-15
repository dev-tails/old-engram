import React from "react";
import "./Header.scss";

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className="header-wrapper">
      <div className="header">
        <div className="left-button">{/* <button>&lt;</button> */}</div>
        <div className="title">All</div>
        <div className="right-button">{/* <button>...</button> */}</div>
      </div>
    </div>
  );
};
