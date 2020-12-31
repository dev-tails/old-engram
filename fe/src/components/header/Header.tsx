import './Header.scss';

import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MoreHoriz } from '@material-ui/icons';
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [dateString, setDateString] = useState(
    moment(date).format("YYYY-MM-DD")
  );

  const classes = useStyles();

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
        onDateChange(dateAsMoment.startOf("d").toDate());
      }
    }
  };

  const handleDateRangeChanged = (newValue: string) => {
    onDateRangeChange(newValue);
    handleCloseDateRangeMenu();
  };

  const handleDateRangeClicked = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDateRangeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className="header">
      <AppBar>
        <Toolbar>
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
          <Button
            id="date-range-button"
            aria-controls="date-range-menu"
            aria-haspopup="true"
            onClick={handleDateRangeClicked}
          >
            {dateRangeValue}
          </Button>
          <Menu
            id="date-range-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseDateRangeMenu}
          >
            {[
              "Day",
              "Week",
              "Fortnight",
              "Month",
              "Quarter",
              "Year",
              "After",
              "Before",
            ].map((option) => {
              return (
                <MenuItem
                  key={option}
                  value={option}
                  onClick={handleDateRangeChanged.bind(this, option)}
                >
                  {option}
                </MenuItem>
              );
            })}
          </Menu>
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
