import "./FloatingActionButton.scss";

import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";

type FloatingActionButtonProps = {
  onClick(event: React.MouseEvent): void;
};

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
}) => {
  return (
    <div className="floating-action-button">
      <Fab onClick={onClick} color="primary">
        <AddIcon />
      </Fab>
    </div>
  );
};
