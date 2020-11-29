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
import { Menu, MoreHoriz } from "@material-ui/icons";
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
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [widgets, setWidgets] = useState<Widget[]>([]);

  const classes = useStyles();

  useEffect(() => {
    if (!leftDrawerOpen) {
      return;
    }

    async function getAllWidgets() {
      const fetchedWidgets = await getWidgets();
      setWidgets(fetchedWidgets);
    }
    getAllWidgets();
  }, [leftDrawerOpen]);

  const handleLeftMenuButtonClicked = () => {
    setLeftDrawerOpen(true);
  };

  const handleRightMenuButtonClicked = () => {
    setRightDrawerOpen(true);
  };

  return (
    <div className="header">
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleLeftMenuButtonClicked}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleRightMenuButtonClicked}
          >
            <MoreHoriz />
          </IconButton>
        </Toolbar>
      </AppBar>
      <React.Fragment>
        <SwipeableDrawer
          anchor={"left"}
          open={leftDrawerOpen}
          onClose={setLeftDrawerOpen.bind(this, false)}
          onOpen={setLeftDrawerOpen.bind(this, true)}
        >
          <div className="drawer-contents">
            <List>
              <Link to={`/`}>
                <ListItem button>
                  <ListItemText primary={"All"} />
                </ListItem>
              </Link>
              <Link to={`/daily`}>
                <ListItem button>
                  <ListItemText primary={"Daily"} />
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
      <React.Fragment>
        <SwipeableDrawer
          anchor={"right"}
          open={rightDrawerOpen}
          onClose={setRightDrawerOpen.bind(this, false)}
          onOpen={setRightDrawerOpen.bind(this, true)}
        >
          <div className="drawer-contents">
            <List>
              <Link to={`/logout`}>
                <ListItem button>
                  <ListItemText primary={"Logout"} />
                </ListItem>
              </Link>
            </List>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};
