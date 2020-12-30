import './Header.scss';

import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, MoreHoriz } from '@material-ui/icons';
import moment from 'moment';
import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { isMobileUserAgent } from '../../utils/UserAgentUtils';

type HeaderProps = {
  dateRangeValue: string;
  date?: Date;
  title?: string;
  onDateChange?: (date: Date) => void;
  onDateRangeChange: (dateRange: string) => void;
};

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
  textField: {
    color: "#FFFFFF",
  },
}));

export const Header: React.FC<HeaderProps> = ({
  title,
  date,
  onDateChange,
  dateRangeValue,
  onDateRangeChange,
}) => {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [dateString, setDateString] = useState(
    moment(date).format("YYYY-MM-DD")
  );

  const classes = useStyles();

  const handleLeftMenuButtonClicked = () => {
    setLeftDrawerOpen(true);
  };

  const handleRightMenuButtonClicked = () => {
    setRightDrawerOpen(true);
  };

  const links = [
    { to: "/", title: "Home" },
    { to: "/daily", title: "Daily" },
    { to: "/collections/agenda", title: "Agenda" },
    { to: "/archive", title: "Archive" },
  ];

  if (isMobileUserAgent()) {
    links.shift();
  }

  const handleDateChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setDateString(event.currentTarget.value);
  };

  const handleDateBlur = () => {
    if (onDateChange) {
      const dateAsMoment = moment(dateString);
      if (dateAsMoment.isValid()) {
        onDateChange(dateAsMoment.toDate());
      }
    }
  };

  const handleDateRangeChanged = (event: any) => {
    onDateRangeChange(event.target.value);
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
            {title ? (
              title
            ) : (
              <TextField
                id="date"
                type="date"
                value={dateString}
                onChange={handleDateChanged}
                onBlur={handleDateBlur}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            )}
          </Typography>
          <Select
            id="date-range"
            value={dateRangeValue}
            onChange={handleDateRangeChanged}
            disableUnderline={true}
          >
            {["D", "W", "F", "M", "Q", "Y", "A"].map((option) => {
              return (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              );
            })}
          </Select>
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
