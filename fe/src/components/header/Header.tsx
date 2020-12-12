import {
  AppBar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu, MoreHoriz, ChevronLeft, ChevronRight } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

type HeaderProps = {
  title: string;
  showArrows?: boolean;
  onArrowClicked?: (direction: string) => void;
};

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
}));

export const Header: React.FC<HeaderProps> = ({
  title,
  showArrows,
  onArrowClicked,
}) => {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

  const classes = useStyles();

  const handleLeftMenuButtonClicked = () => {
    setLeftDrawerOpen(true);
  };

  const handleRightMenuButtonClicked = () => {
    setRightDrawerOpen(true);
  };

  const links = [
    { to: "/daily", title: "Daily" },
    { to: "/collections/agenda", title: "Agenda" },
    { to: "/archive", title: "Archive" },
  ];

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
            {showArrows && (
              <IconButton
                color="inherit"
                onClick={
                  onArrowClicked ? onArrowClicked.bind(this, "left") : () => {}
                }
              >
                <ChevronLeft />
              </IconButton>
            )}
            {title}
            {showArrows && (
              <IconButton
                color="inherit"
                onClick={
                  onArrowClicked ? onArrowClicked.bind(this, "right") : () => {}
                }
              >
                <ChevronRight />
              </IconButton>
            )}
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
        <Drawer
          anchor={"left"}
          open={leftDrawerOpen}
          onClose={setLeftDrawerOpen.bind(this, false)}
          // onOpen={setLeftDrawerOpen.bind(this, true)}
        >
          <div className="drawer-contents">
            <List>
              {links.map((link) => {
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={setLeftDrawerOpen.bind(this, false)}
                  >
                    <ListItem button>
                      <ListItemText primary={link.title} />
                    </ListItem>
                  </Link>
                );
              })}
            </List>
          </div>
        </Drawer>
      </React.Fragment>
      <React.Fragment>
        <Drawer
          anchor={"right"}
          open={rightDrawerOpen}
          onClose={setRightDrawerOpen.bind(this, false)}
          // onOpen={setRightDrawerOpen.bind(this, true)}
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
        </Drawer>
      </React.Fragment>
    </div>
  );
};
