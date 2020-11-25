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
import React, { useEffect, useState } from "react";
import { getWidgets, Widget } from "../widgets/WidgetsApi";
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
  const [widgets, setWidgets] = useState<Widget[]>([]);

  const classes = useStyles();

  useEffect(() => {
    if (!drawerOpen) {
      return;
    }

    async function getAllWidgets() {
      const fetchedWidgets = await getWidgets();
      setWidgets(fetchedWidgets);
    }
    getAllWidgets();
  }, [drawerOpen]);

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
              {widgets.map((widget) => {
                return (
                  <ListItem button>
                    <ListItemText primary={widget.name} />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};
