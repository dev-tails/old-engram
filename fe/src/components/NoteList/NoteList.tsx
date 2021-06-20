import './NoteList.scss';

import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateNote } from '../../redux/actions/NotesActions';
import { Markdown } from '../Markdown/Markdown';
import { NoteIcon } from '../notes/NoteIcon/NoteIcon';
import { Note, NoteType } from '../notes/NotesApi';

type NoteListProps = {};

export const NoteList: React.FC<NoteListProps> = (props) => {
  const dispatch = useDispatch();
  const notes = useSelector((state: any) => state.notes);

  const types: NoteType[] = ["note", "task", "task_completed", "event"];
  function handleToggleType(note: Note) {
    const currentTypeIndex = types.indexOf(note.type || "note");
    let nextTypeIndex = (currentTypeIndex + 1) % types.length;
    updateNote(dispatch, { ...note, type: types[nextTypeIndex] });
  }

  return (
    <div className="note-list">
      <List disablePadding={true} dense={true}>
        {notes.map((note: Note) => {
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
