import {
  AppBar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { getWidgets, Widget } from "../widgets/WidgetsApi";
import "./Header.scss";
import { Link } from "react-router-dom";

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
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  const handleMenuButtonClicked = () => {
    setDrawerOpen(true);
  };

  return (
    <div className="header">
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuButtonClicked}
          >
            <Menu />
          </IconButton>
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
              <Link to={`/notes`}>
                <ListItem button>
                  <ListItemText primary={"Notes"} />
                </ListItem>
              </Link>
              {widgets.map((widget) => {
                return (
                  <Link key={widget._id} to={`/widgets/${widget._id}`}>
                    <ListItem button>
                      <ListItemText primary={widget.name} />
                    </ListItem>
                  </Link>
                );
              })}
            </List>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};
