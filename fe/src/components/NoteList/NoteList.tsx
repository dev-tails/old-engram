import './NoteList.scss';

import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import moment from 'moment';
import React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isPluginEnabled, PluginName } from '../../Plugins';
import { setNote } from '../../redux/actions/NoteActions';
import { removeNote, updateNote } from '../../redux/actions/NotesActions';
import { zapNote } from '../../ZapierApi';
import { Markdown } from '../Markdown/Markdown';
import { NoteIcon } from '../notes/NoteIcon/NoteIcon';
import { Note, NoteType } from '../notes/NotesApi';

type NoteListProps = {};

export const NoteList: React.FC<NoteListProps> = (props) => {
  const dispatch = useDispatch();
  const { note, notes, type } = useSelector((state: any) => {
    return {
      type: state.type,
      note: state.note,
      notes: state.notes,
    };
  });
  const notesForType = useMemo(() => {
    if (type === "all") {
      return notes;
    }
    const allowedTypes = [type];
    if (type === "task") {
      allowedTypes.push("task_completed");
    }
    return notes.filter((note: Note) => {
      return allowedTypes.includes(note.type || "note");
    });
  }, [notes, type]);

  const [selectedNoteId, setSelectedNoteId] = useState<string>("");
  const [menuAnchoEl, setMenuAnchorEl] =
    React.useState<null | HTMLDivElement>(null);

  function handleToggleType(note: Note) {
    if (type === "note" || type === "event") {
      return;
    }

    let types: NoteType[] = ["note", "task", "task_completed", "event"];

    if (type === "task") {
      types = ["task", "task_completed"];
    }

    const currentTypeIndex = types.indexOf(note.type || "note");
    let nextTypeIndex = (currentTypeIndex + 1) % types.length;
    updateNote(dispatch, { ...note, type: types[nextTypeIndex] });
  }

  function handleMoreClicked(note: Note, event: any) {
    setSelectedNoteId(note.localId || "");
    setNote(dispatch, null);
    setMenuAnchorEl(event.target as any);
  }

  function hideMenu() {
    setMenuAnchorEl(null);
  }

  function handleEditNote() {
    hideMenu();
    const note = getNoteById(selectedNoteId);
    setNote(dispatch, note);
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

  async function handleMoveToTomorrow() {
    hideMenu();

    const note = getNoteById(selectedNoteId);
    if (!note) {
      return;
    }

    updateNote(dispatch, {
      ...note,
      date: moment(note.date).add(1, "day").format("YYYY-MM-DD"),
    });
  }

  async function handleZapClicked() {
    hideMenu();
    const note = getNoteById(selectedNoteId);
    if (note) {
      zapNote(note);
    }
  }

  async function handleRemoveClicked() {
    hideMenu();
    removeNote(dispatch, { _id: selectedNoteId });
  }

  function getNoteById(localId: string) {
    return notesForType.find((note: Note) => note.localId === localId);
  }

  function handleQuickEdit(note: Note) {
    setSelectedNoteId(note.localId || "");
    setNote(dispatch, note);
  }

  const isShareEnabled = Boolean(navigator.share);
  const isZapEnabled = isPluginEnabled(PluginName.PLUGIN_ZAPIER);

  return (
    <div className="note-list">
      <List disablePadding={true} dense={true}>
        {notesForType.map((listItemNote: Note) => {
          return (
            <div key={listItemNote.localId}>
              <Divider />
              <ListItem
                className={`note-list-item ${
                  note?.localId === listItemNote.localId ? "selected" : ""
                }`}
                onClick={() => {
                  handleQuickEdit(listItemNote);
                }}
              >
                <ListItemIcon>
                  <IconButton
                    edge="start"
                    onClick={(e) => {
                      handleToggleType(listItemNote);
                    }}
                  >
                    <NoteIcon type={listItemNote.type} />
                  </IconButton>
                </ListItemIcon>
                <ListItemText>
                  <Markdown body={listItemNote.body || ""} />
                </ListItemText>
                <ListItemIcon className="right-icon">
                  <IconButton
                    edge="end"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoreClicked(listItemNote, e);
                    }}
                  >
                    <MoreVert />
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
        onClose={hideMenu}
      >
        <MenuItem onClick={handleEditNote}>Edit</MenuItem>
        {/* <MenuItem onClick={handleMoveToTomorrow}>Move to Tomorrow</MenuItem> */}
        {isShareEnabled ? (
          <MenuItem onClick={handleShareClicked}>Share...</MenuItem>
        ) : null}
        {isZapEnabled ? (
          <MenuItem onClick={handleZapClicked}>Zap</MenuItem>
        ) : null}
        {/* <MenuItem onClick={handleShareLinkClicked}>Share Link...</MenuItem> */}
        <MenuItem onClick={handleRemoveClicked}>Remove</MenuItem>
      </Menu>
    </div>
  );
};
