import './Header.scss';

import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight, MoreHoriz } from '@material-ui/icons';
import moment, { DurationInputArg2 } from 'moment';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { isMobileUserAgent } from '../../utils/UserAgentUtils';

type HeaderProps = {
  dateRangeValue: string;
  date?: Date;
  title?: string;
  onDateChange: (date: Date) => void;
  onDateRangeChange: (dateRange: string) => void;
};

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

  useEffect(() => {
    setDateString(moment(date).format("YYYY-MM-DD"));
  }, [date]);

  useEffect(() => {
    function keyDownListener(event: KeyboardEvent) {
      if (!event.altKey) {
        return;
      }

      let dateRangeMap: { [key: string]: string } = {
        a: "Agenda",
        d: "Day",
        w: "Week",
        f: "Fortnight",
        m: "Month",
        q: "Quarter",
        y: "Year",
      };
      const dateRange = dateRangeMap[event.key];
      if (dateRange) {
        event.preventDefault();
        handleDateRangeChanged(dateRange);
      }

      if (event.key === "ArrowLeft") {
        handleNavigateDate("left");
        event.preventDefault();
      } else if (event.key === "ArrowRight") {
        handleNavigateDate("right");
        event.preventDefault();
      }
    }
    document.addEventListener("keydown", keyDownListener);

    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  });

  const isDateView = !!title;

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

  const handleNavigateDate = (direction: "left" | "right") => {
    const unitMap: { [key: string]: DurationInputArg2 } = {
      Agenda: "day",
      Day: "day",
      Week: "week",
      Fortnight: "week",
      Month: "month",
      Quarter: "quarter",
      Year: "year",
    };
    const unit = unitMap[dateRangeValue];
    let amount = dateRangeValue === "Fortnight" ? 2 : 1;

    if (direction === "left") {
      onDateChange(moment(date).add(-amount, unit).startOf(unit).toDate());
    } else if (direction === "right") {
      onDateChange(moment(date).add(amount, unit).startOf(unit).toDate());
    }
  };

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
          {!isDateView && (
            <>
              <IconButton
                id="date-range-button"
                aria-controls="date-range-menu"
                aria-haspopup="true"
                edge="start"
                color="inherit"
                size="small"
                onClick={handleDateRangeClicked}
              >
                {dateRangeValue[0]}
              </IconButton>
              <Menu
                id="date-range-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseDateRangeMenu}
              >
                {[
                  "Agenda",
                  "Day",
                  "Week",
                  "Fortnight",
                  "Month",
                  "Quarter",
                  "Year",
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
            </>
          )}

          <div className="spacer" />

          {!isDateView && (
            <IconButton
              color="inherit"
              onClick={handleNavigateDate.bind(this, "left")}
            >
              <ChevronLeft />
            </IconButton>
          )}
          <div className="title">
            {title ? (
              title
            ) : (
              <TextField
                id="date"
                type="date"
                required
                value={dateString}
                onChange={handleDateChanged}
                onBlur={handleDateBlur}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            )}
          </div>
          {!isDateView && (
            <IconButton
              color="inherit"
              onClick={handleNavigateDate.bind(this, "right")}
            >
              <ChevronRight />
            </IconButton>
          )}

          <div className="spacer" />

          {!isDateView && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleRightMenuButtonClicked}
            >
              <MoreHoriz />
            </IconButton>
          )}
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
