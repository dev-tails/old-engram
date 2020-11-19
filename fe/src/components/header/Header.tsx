import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useLocation } from "react-router";

type HeaderProps = {};

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    flexGrow: 1,
  },
}));

export const Header: React.FC<HeaderProps> = (props) => {
  const classes = useStyles();
  const location = useLocation();

  let title = "BrainStorm";
  if (location.pathname === "/notes") {
    title = "All";
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
