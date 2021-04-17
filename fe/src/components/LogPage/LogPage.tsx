import './LogPage.scss';

import {
  Divider,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SvgIcon,
} from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import querystring from 'query-string';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { ReactComponent as NoteIcon } from '../icons/NoteIcon.svg';
import { Markdown } from '../Markdown/Markdown';
import * as NotesApi from '../notes/NotesApi';
import TextBox from '../textbox/TextBox';

type LogPageProps = {};

export const LogPage: React.FC<LogPageProps> = (props) => {
  const location = useLocation();
  const [selectedNoteId, setSelectedNoteId] = useState<string>("");
  const [notes, setNotes] = useState<NotesApi.Note[]>([]);
  const [menuAnchoEl, setMenuAnchorEl] = React.useState<null | HTMLDivElement>(
    null
  );

  const handleSubmit = async (note: NotesApi.Note) => {
    const createdNote = await NotesApi.createNote(note);
    setNotes([...notes, createdNote]);
  };

  const { query } = querystring.parseUrl(location.search);
  const { body, text, url, title } = query;

  let initialBody = body as string;
  if (title && url) {
    initialBody = `[${title}](${url})`;
  } else if (text) {
    initialBody = text as string;
  }

  const handleMoreClicked = (note: NotesApi.Note, event: any) => {
    setSelectedNoteId(note.localId || "");
    setMenuAnchorEl(event.target as any);
  };

  function getNoteById(localId: string) {
    return notes.find((note) => note.localId === localId);
  }

  function handleShareClicked() {
    hideMenu();
    const note = getNoteById(selectedNoteId);
    if (note && navigator) {
      navigator.share({
        text: note.body,
      });
    }
  }

  async function handleRemoveClicked() {
    hideMenu();
    await NotesApi.removeNote(selectedNoteId);
    const noteIndex = notes.findIndex(
      (note) => note.localId === selectedNoteId
    );
    const notesCopy = [...notes];
    notesCopy.splice(noteIndex, 1);
    setNotes(notesCopy);
  }

  function hideMenu() {
    setMenuAnchorEl(null);
  }

  const isShareEnabled = Boolean(navigator.share);

  return (
    <div className="log-page">
      <div className="log-page__content">
        <div className="log-page__notes-container">
          <div className="log-page__notes">
            <List disablePadding={true}>
              {notes.map((note) => {
                return (
                  <div key={note.localId}>
                    <Divider />
                    <ListItem button>
                      <ListItemIcon>
                        <IconButton edge="start">
                          <SvgIcon component={NoteIcon}></SvgIcon>
                        </IconButton>
                      </ListItemIcon>
                      <ListItemText>
                        <Markdown body={note.body || ""} />
                      </ListItemText>
                      <ListItemIcon>
                        <IconButton
                          edge="end"
                          onClick={handleMoreClicked.bind(this, note)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </ListItemIcon>
                    </ListItem>
                  </div>
                );
              })}
            </List>
            <Menu
              id="fade-menu"
              anchorEl={menuAnchoEl}
              keepMounted
              open={Boolean(menuAnchoEl)}
              onClose={setMenuAnchorEl.bind(this, null)}
              TransitionComponent={Fade}
              anchorOrigin={{ vertical: "center", horizontal: "right" }}
            >
              <Link
                to={`/notes/${selectedNoteId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>Edit</MenuItem>
              </Link>
              {isShareEnabled ? (
                <MenuItem onClick={handleShareClicked}>Share...</MenuItem>
              ) : null}
              <MenuItem onClick={handleRemoveClicked}>Remove</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      <div className="log-page__footer">
        <div className="log-page__textBox">
          <TextBox initialBody={initialBody} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
