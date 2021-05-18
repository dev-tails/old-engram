import './Header.scss';

import {
  AppBar,
  Divider,
  Drawer,
  Fade,
  fade,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  Menu,
  MenuItem,
  SvgIcon,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  AccountCircle,
  Dashboard,
  ExitToApp as ExitIcon,
  Help,
  Menu as MenuIcon,
  MenuBook,
  NewReleases,
  Person,
  PersonAdd,
  Settings,
  ViewDay,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { ReactComponent as EngramLogo } from '../../logo.svg';
import { isPluginEnabled, PluginName } from '../../Plugins';
import * as UsersApi from '../../UsersApi';
import { Holdable } from '../Holdable/Holdable';
import { createOrUpdateNote, getNotes, Note, removeNote } from '../notes/NotesApi';

type HeaderProps = {
  title?: string;
  isPublicRoute: boolean;
  activeParentId: string | undefined | null;
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
  activeParentId,
  isPublicRoute,
  onWorkspaceSelected,
}) => {
  const classes = useStyles();

  const history = useHistory();
  const path = history.location.pathname;

  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [selectedWorkspaceId, setSelectedWorkspaceId] =
    useState<string | undefined | null>(null);
  const [workspaceAnchorEl, setWorkspaceAnchorEl] =
    React.useState<null | HTMLDivElement>(null);
  const [workspaces, setWorkspaces] = useState<Note[]>([]);
  const [workspaceBody, setWorkspaceBody] = useState<string | null>(null);
  const [user, setUser] = useState<UsersApi.User | null>(null);

  useEffect(() => {
    async function getWorkspaces() {
      const fetchedWorkspaces = await getNotes({ type: "workspace" });
      setWorkspaces(fetchedWorkspaces);
    }

    async function fetchMe() {
      const me = await UsersApi.getMe();
      setUser(me);
    }

    if (!isPublicRoute) {
      fetchMe();
      getWorkspaces();
    }
  }, [isPublicRoute]);

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
          onWorkspaceSelected(
            workspaces[digit].localId,
            workspaces[digit].body
          );
        }
        event.preventDefault();
      }
    }
    document.addEventListener("keydown", keyDownListener);

    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  });

  const handleLeftDrawerOpened = () => {
    setLeftDrawerOpen(true);
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
    onWorkspaceSelected(workspace?.localId, workspace?.body);
    setLeftDrawerOpen(false);
    history.push("/dashboard");
  };

  const handleWorkspaceLongPress = (
    workspace: Note,
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    setWorkspaceAnchorEl(event.target as any);
    setSelectedWorkspaceId(workspace.localId || null);
  };

  const handleRemoveWorkspace = async () => {
    await removeNote(selectedWorkspaceId);
    setSelectedWorkspaceId(null);
    setWorkspaceAnchorEl(null);
    const workspacesCopy = Array.from(workspaces);
    const index = workspacesCopy.findIndex(
      (w) => w.localId === selectedWorkspaceId
    );
    workspacesCopy.splice(index, 1);
    setWorkspaces(workspacesCopy);
  };

  return (
    <div className="header">
      <AppBar>
        <Toolbar>
          {!isPublicRoute && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleLeftDrawerOpened}
            >
              <MenuIcon />
            </IconButton>
          )}

          <div className="spacer" />

          {title ? <Typography variant="h6">{title}</Typography> : null}

          <div className="spacer" />

          {!isPublicRoute ? (
            <Link to="/quick-capture">
              <IconButton className="logo" edge="end">
                <img
                  alt="engram logo"
                  width="36"
                  height="36"
                  src="/images/logo.svg"
                />
              </IconButton>
            </Link>
          ) : null}
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
              <Link
                to="/quick-capture"
                onClick={setLeftDrawerOpen.bind(this, false)}
              >
                <ListItem button selected={path === "/quick-capture"}>
                  <ListItemIcon>
                    <SvgIcon
                      component={EngramLogo}
                      viewBox="0 0 1024 1024"
                      style={{ color: "black" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={"Brain Dump"} />
                </ListItem>
              </Link>
              <Divider />
              <Link to="/daily" onClick={setLeftDrawerOpen.bind(this, false)}>
                <ListItem button selected={path === "/daily"}>
                  <ListItemIcon>
                    <ViewDay />
                  </ListItemIcon>
                  <ListItemText primary={"Daily Notes"} />
                </ListItem>
              </Link>
              <Divider />

              {isPluginEnabled(PluginName.PLUGIN_DASHBOARD) ? (
                <>
                  <ListItem
                    button
                    onClick={handleWorkspaceSelected.bind(this, null)}
                    selected={path === "/dashboard" && !activeParentId}
                  >
                    <ListItemIcon>
                      <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                  <Divider />
                </>
              ) : null}

              {isPluginEnabled(PluginName.PLUGIN_PAGES) ? (
                <>
                  <Link
                    to="/pages"
                    onClick={setLeftDrawerOpen.bind(this, false)}
                  >
                    <ListItem button selected={path === "/pages"}>
                      <ListItemIcon>
                        <MenuBook />
                      </ListItemIcon>
                      <ListItemText primary={"Pages"} />
                    </ListItem>
                  </Link>
                  <Divider />
                </>
              ) : null}
              {isPluginEnabled(PluginName.PLUGIN_WORKSPACES) ? (
                <>
                  <ListSubheader>Workspaces</ListSubheader>
                  <List component="div" disablePadding>
                    {workspaces.map((workspace) => {
                      return (
                        <Holdable
                          key={workspace.localId}
                          onLongPress={handleWorkspaceLongPress.bind(
                            this,
                            workspace
                          )}
                          onClick={handleWorkspaceSelected.bind(
                            this,
                            workspace
                          )}
                        >
                          <ListItem
                            key={workspace.localId}
                            selected={workspace.localId === activeParentId}
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
                          <ListItemText primary={"Create Workspace"} />
                        </>
                      )}
                    </ListItem>
                    <Divider />
                  </List>
                </>
              ) : null}
              <Link
                to={`/settings`}
                onClick={setLeftDrawerOpen.bind(this, false)}
              >
                <ListItem button selected={path === "/settings"}>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary={"Settings"} />
                </ListItem>
              </Link>
              <a
                href={`https://engramhq.xyz/help`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={setLeftDrawerOpen.bind(this, false)}
              >
                <ListItem button>
                  <ListItemIcon>
                    <Help />
                  </ListItemIcon>
                  <ListItemText primary={"Help"} />
                </ListItem>
              </a>
              <a
                href={`https://engramhq.xyz/blog`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={setLeftDrawerOpen.bind(this, false)}
              >
                <ListItem button>
                  <ListItemIcon>
                    <NewReleases />
                  </ListItemIcon>
                  <ListItemText primary={"Updates"} />
                </ListItem>
              </a>

              <div className="drawer-footer">
                {user ? (
                  <>
                    <ListItem>
                      <ListItemIcon>
                        <AccountCircle />
                      </ListItemIcon>
                      <ListItemText>{user.username}</ListItemText>
                    </ListItem>
                    <Link
                      to={`/logout`}
                      onClick={setLeftDrawerOpen.bind(this, false)}
                    >
                      <ListItem button>
                        <ListItemIcon>
                          <ExitIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Logout"} />
                      </ListItem>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={`/signup`}
                      onClick={setLeftDrawerOpen.bind(this, false)}
                    >
                      <ListItem button>
                        <ListItemIcon>
                          <PersonAdd />
                        </ListItemIcon>
                        <ListItemText primary={"Sign up"} />
                      </ListItem>
                    </Link>
                    <Link
                      to={`/login`}
                      onClick={setLeftDrawerOpen.bind(this, false)}
                    >
                      <ListItem button>
                        <ListItemIcon>
                          <Person />
                        </ListItemIcon>
                        <ListItemText primary={"Log in"} />
                      </ListItem>
                    </Link>
                  </>
                )}
              </div>
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
    </div>
  );
};
