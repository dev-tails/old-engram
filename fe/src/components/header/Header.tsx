import {
  AppBar,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import "./Header.scss";

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
  const [drawerOpen, setDrawerOpen] = useState(true);
  const classes = useStyles();

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <React.Fragment>
        <SwipeableDrawer
          anchor={"left"}
          open={drawerOpen}
          onClose={setDrawerOpen.bind(this, false)}
          onOpen={setDrawerOpen.bind(this, true)}
        >
          <div className="drawer-contents">
            <List>
              <ListItem button>
                <ListItemText primary="Widget Name" />
              </ListItem>
            </List>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};
