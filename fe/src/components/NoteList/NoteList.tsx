import './NoteList.scss';

import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import React from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateNote } from '../../redux/actions/NotesActions';
import { Markdown } from '../Markdown/Markdown';
import { NoteIcon } from '../notes/NoteIcon/NoteIcon';
import { Note, NoteType } from '../notes/NotesApi';

type NoteListProps = {};

export const NoteList: React.FC<NoteListProps> = (props) => {
  const dispatch = useDispatch();
  const { notes, type } = useSelector((state: any) => {
    return {
      type: state.type,
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

  return (
    <div className="note-list">
      <List disablePadding={true} dense={true}>
        {notesForType.map((note: Note) => {
          return (
            <div key={note.localId}>
              <Divider />
              <ListItem className="note-list-item">
                <ListItemIcon>
                  <IconButton
                    edge="start"
                    onClick={(e) => {
                      handleToggleType(note);
                    }}
                  >
                    <NoteIcon type={note.type} />
                  </IconButton>
                </ListItemIcon>
                <ListItemText>
                  <Markdown body={note.body || ""} />
                </ListItemText>
                <ListItemIcon className="right-icon">
                  <IconButton
                    edge="end"
                    onClick={(e) => {
                      // handleMoreClicked(note, e);
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
    </div>
  );
};
