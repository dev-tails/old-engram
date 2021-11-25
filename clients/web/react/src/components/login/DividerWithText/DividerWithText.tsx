import "./DividerWithText.scss";

import React from "react";

export type DividerWithTextProps = {};

export const DividerWithText: React.FC<DividerWithTextProps> = (props) => {
  return (
    <div className="divider-with-text">
      <div className="border" />
      <div className="content">{props.children}</div>
      <div className="border" />
    </div>
  );
};
