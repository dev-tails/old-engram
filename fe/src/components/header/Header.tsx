import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

type HeaderProps = {
  title: string;
};

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
}));

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
