import "./Header.scss";

import {
  AppBar,
  Drawer,
  Fade,
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
import { Add, Home, MoreHoriz, Search as SearchIcon } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { Holdable } from "../Holdable/Holdable";
import {
  createOrUpdateNote,
  getNotes,
  Note,
  removeNote,
} from "../notes/NotesApi";

type HeaderProps = {
  dateRangeValue: string;
  date?: Date;
  title?: string;
  onDateChange: (date: Date) => void;
  onDateRangeChange: (dateRange: string) => void;
  onSearchSubmit: (search: string) => void;
  onWorkspaceSelected: (id: string | null | undefined, name?: string) => void;
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

  const [search, setSearch] = useState<string | null>(null);
  const isSearchOpen = search !== null;
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<
    string | undefined | null
  >(null);
  const [
    workspaceAnchorEl,
    setWorkspaceAnchorEl,
  ] = React.useState<null | HTMLDivElement>(null);
  const [workspaces, setWorkspaces] = useState<Note[]>([]);
  const [workspaceBody, setWorkspaceBody] = useState<string | null>(null);

  const isDateView = !title;

  useEffect(() => {
    async function getWorkspaces() {
      const fetchedWorkspaces = await getNotes({ type: "workspace" });
      setWorkspaces(fetchedWorkspaces);
    }
    if (isDateView) {
      getWorkspaces();
    }
  }, [isDateView]);

  useEffect(() => {
    function keyDownListener(event: KeyboardEvent) {
      if (!event.altKey) {
        return;
      }

      if (event.code.includes("Digit")) {
        const digit = Number(event.code[event.code.length - 1]) - 1;
        if (digit < 0) {
          onWorkspaceSelected(null);
        } else if (digit < workspaces.length) {
          onWorkspaceSelected(workspaces[digit]._id, workspaces[digit].body);
        }
        event.preventDefault();
      }
    }
    document.addEventListener("keydown", keyDownListener);

    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  });

  const handleRightMenuButtonClicked = () => {
    setRightDrawerOpen(true);
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

  const handleWorkspaceSelected = (workspace: Note | null) => {
    onWorkspaceSelected(workspace?._id, workspace?.body);
    setLeftDrawerOpen(false);
  };

  const handleWorkspaceLongPress = (
    workspace: Note,
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    setWorkspaceAnchorEl(event.target as any);
    setSelectedWorkspaceId(workspace._id || null);
  };

  const handleRemoveWorkspace = async () => {
    await removeNote(selectedWorkspaceId);
    setSelectedWorkspaceId(null);
    setWorkspaceAnchorEl(null);
    const workspacesCopy = Array.from(workspaces);
    const index = workspacesCopy.findIndex(
      (w) => w._id === selectedWorkspaceId
    );
    workspacesCopy.splice(index, 1);
    setWorkspaces(workspacesCopy);
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

          <div className="title">{title ? title : null}</div>

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
                  const newSearch = event.currentTarget.value;
                  setSearch(newSearch);
                  onSearchSubmit(newSearch);
                }}
                onBlur={() => {
                  if (!search) {
                    setSearch(null);
                  }
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
              <ListItem
                button
                onClick={handleWorkspaceSelected.bind(this, null)}
              >
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Workspaces" />
              </ListItem>
              <List component="div" disablePadding>
                {workspaces.map((workspace) => {
                  return (
                    <Holdable
                      key={workspace._id}
                      onLongPress={handleWorkspaceLongPress.bind(
                        this,
                        workspace
                      )}
                      onClick={handleWorkspaceSelected.bind(this, workspace)}
                    >
                      <ListItem
                        key={workspace._id}
                        button
                        className={classes.nested}
                      >
                        <ListItemText primary={workspace.body} />
                      </ListItem>
                    </Holdable>
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
            <Menu
              id="fade-menu"
              anchorEl={workspaceAnchorEl}
              keepMounted
              open={Boolean(workspaceAnchorEl)}
              onClose={setWorkspaceAnchorEl.bind(this, null)}
              TransitionComponent={Fade}
              anchorOrigin={{ vertical: "center", horizontal: "right" }}
            >
              <MenuItem onClick={handleRemoveWorkspace}>Remove</MenuItem>
            </Menu>
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
