import "./Header.scss";

import {
  AppBar,
  Drawer,
  fade,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
} from "@material-ui/core";
import {
  Add,
  ChevronLeft,
  ChevronRight,
  MoreHoriz,
  Search as SearchIcon,
} from "@material-ui/icons";
import moment, { DurationInputArg2 } from "moment";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { isMobileUserAgent } from "../../utils/UserAgentUtils";
import { createOrUpdateNote, getNotes, Note } from "../notes/NotesApi";

type HeaderProps = {
  dateRangeValue: string;
  date?: Date;
  title?: string;
  onDateChange: (date: Date) => void;
  onDateRangeChange: (dateRange: string) => void;
  onSearchSubmit: (search: string) => void;
  onWorkspaceSelected: (id: string) => void;
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const Header: React.FC<HeaderProps> = ({
  title,
  date,
  onDateChange,
  dateRangeValue,
  onDateRangeChange,
  onSearchSubmit,
  onWorkspaceSelected,
}) => {
  const history = useHistory();
  const classes = useStyles();

  const dateInputRef = useRef<HTMLDivElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [search, setSearch] = useState<string | null>(null);
  const isSearchOpen = search !== null;
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [dateString, setDateString] = useState(
    moment(date).format("YYYY-MM-DD")
  );

  const [workspaces, setWorkspaces] = useState<Note[]>([]);
  const [workspaceBody, setWorkspaceBody] = useState<string | null>(null);

  useEffect(() => {
    setDateString(moment(date).format("YYYY-MM-DD"));
  }, [date]);

  useEffect(() => {
    async function getWorkspaces() {
      const fetchedWorkspaces = await getNotes({ type: "workspace" });
      setWorkspaces(fetchedWorkspaces);
    }
    getWorkspaces();
  }, []);

  useEffect(() => {
    function keyDownListener(event: KeyboardEvent) {
      if (!event.altKey) {
        return;
      }

      if (event.key === "t") {
        event.preventDefault();
        onDateChange(new Date());
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

  const isDateView = !title;

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

  const handleLogoClicked = () => {
    if (isDateView) {
      setLeftDrawerOpen(true);
    } else {
      history.push("/");
    }
  };

  const handleSubmitWorkspace = async () => {
    if (workspaceBody) {
      const newWorkspace = await createOrUpdateNote({
        type: "workspace",
        body: workspaceBody,
      });
      setWorkspaces([...workspaces, newWorkspace]);
    }
    setWorkspaceBody(null);
  };

  const handleWorkspaceSelected = (workspace: Note) => {
    if (workspace._id) {
      onWorkspaceSelected(workspace._id);
    }
    setLeftDrawerOpen(false);
  };

  return (
    <div className="header">
      <AppBar className={`${isSearchOpen ? "search" : ""}`}>
        <Toolbar>
          <IconButton onClick={handleLogoClicked} edge="start" color="inherit">
            <img
              alt="engram logo"
              width="36"
              height="36"
              src="/images/logo.svg"
            />
          </IconButton>

          {isDateView && (
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
                      title={`Alt + ${option[0]}`}
                    >
                      {option}
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
          )}

          {isDateView && (
            <IconButton
              color="inherit"
              onClick={handleNavigateDate.bind(this, "left")}
              title="Alt+LeftArrow"
              size="small"
            >
              <ChevronLeft />
            </IconButton>
          )}
          {isDateView && (
            <IconButton
              color="inherit"
              onClick={handleNavigateDate.bind(this, "right")}
              title="Alt+RightArrow"
              size="small"
            >
              <ChevronRight />
            </IconButton>
          )}

          <div className="title">
            {title ? (
              title
            ) : (
              <TextField
                id="date"
                type="date"
                ref={dateInputRef}
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

          <div className="spacer" />

          {isDateView && !isSearchOpen && (
            <IconButton
              color="inherit"
              aria-label="menu"
              size="small"
              onClick={setSearch.bind(this, "")}
            >
              <SearchIcon />
            </IconButton>
          )}

          {isDateView && isSearchOpen && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                autoFocus
                inputProps={{ "aria-label": "search" }}
                value={search}
                onChange={(event) => {
                  setSearch(event.currentTarget.value);
                }}
                onBlur={() => {
                  if (!search) {
                    setSearch(null);
                  }
                  onSearchSubmit(search || "");
                }}
              />
            </div>
          )}

          {isDateView && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              size="small"
              onClick={handleRightMenuButtonClicked}
            >
              <MoreHoriz />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <React.Fragment>
        <Drawer
          anchor={"left"}
          open={leftDrawerOpen}
          onClose={setLeftDrawerOpen.bind(this, false)}
        >
          <div className="drawer-contents">
            <List>
              <ListItem button>
                <ListItemText primary="Workspaces" />
              </ListItem>
              <List component="div" disablePadding>
                {workspaces.map((workspace) => {
                  return (
                    <ListItem
                      key={workspace._id}
                      button
                      className={classes.nested}
                      onClick={handleWorkspaceSelected.bind(this, workspace)}
                    >
                      <ListItemText primary={workspace.body} />
                    </ListItem>
                  );
                })}
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    setWorkspaceBody("");
                  }}
                >
                  {workspaceBody !== null ? (
                    <TextField
                      onChange={(event) => {
                        setWorkspaceBody(event.currentTarget.value);
                      }}
                      value={workspaceBody}
                      autoFocus
                      onBlur={handleSubmitWorkspace}
                    />
                  ) : (
                    <>
                      <ListItemIcon>
                        <Add />
                      </ListItemIcon>
                      <ListItemText primary={"Add"} />
                    </>
                  )}
                </ListItem>
              </List>
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
