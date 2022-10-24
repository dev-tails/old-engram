import './NoteList.scss';

import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { Cancel, MoreVert } from '@material-ui/icons';
import React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { isPluginEnabled, PluginName } from '../../Plugins';
import { setNote } from '../../redux/actions/NoteActions';
import { removeNote, updateNote } from '../../redux/actions/NotesActions';
import { zapNote } from '../../ZapierApi';
import { Markdown } from '../Markdown/Markdown';
import { NoteIcon } from '../notes/NoteIcon/NoteIcon';
import { Note, NoteType } from '../notes/NotesApi';

type NoteListProps = {};

export const NoteList: React.FC<NoteListProps> = (props) => {
  const history = useHistory();
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
  const [selectedNoteBody, setSelectedNoteBody] = useState<string>("");
  const [menuAnchoEl, setMenuAnchorEl] = React.useState<null | HTMLDivElement>(
    null
  );

  function handleToggleType(note: Note) {
    console.log("handleToggleType");

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
    if (!note || !note.localId || !note.body) {
      return;
    }

    setSelectedNoteId(note.localId);
    setSelectedNoteBody(note.body);
    setMenuAnchorEl(event.target as any);
  }

  function clearSelectedNote() {
    setSelectedNoteId("");
    setNote(dispatch, null);
  }

  function hideMenu() {
    setMenuAnchorEl(null);
  }

  function handleEditNote() {
    history.push(`/notes/edit/${selectedNoteId}`);
  }

  function handleCopyNote() {
    navigator.clipboard.writeText(selectedNoteBody);
    hideMenu();
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

  function handleQuickEdit() {
    const note = getNoteById(selectedNoteId);
    setSelectedNoteId(note.localId || "");
    setSelectedNoteBody(note.body || "");
    setNote(dispatch, note);
    hideMenu();
  }

  const isShareEnabled = Boolean(navigator.share);
  const isZapEnabled = isPluginEnabled(PluginName.PLUGIN_ZAPIER);

  return (
    <div className="note-list">
      <List disablePadding={true} dense={true}>
        {notesForType.map((listItemNote: Note) => {
          const isSelectedNote = note
            ? note.localId === listItemNote.localId
            : false;

          return (
            <div key={listItemNote.localId}>
              <Divider />
              <ListItem
                button
                className={`note-list-item ${isSelectedNote ? "selected" : ""}`}
                selected={isSelectedNote}
                onClick={() => {
                  console.log("List item clicked")
                }}
              >
                <ListItemIcon onClick={(e) => {
                  e.stopPropagation();
                  handleToggleType(listItemNote);
                }}>
                  <IconButton
                    edge="start"
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
                {isSelectedNote && (
                  <ListItemIcon className="right-icon">
                    <IconButton
                      edge="end"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearSelectedNote();
                      }}
                    >
                      <Cancel />
                    </IconButton>
                  </ListItemIcon>
                )}
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
        <MenuItem onClick={handleQuickEdit}>Quick Edit</MenuItem>
        <MenuItem onClick={handleEditNote}>Edit...</MenuItem>
        <MenuItem onClick={handleCopyNote}>Copy...</MenuItem>
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
