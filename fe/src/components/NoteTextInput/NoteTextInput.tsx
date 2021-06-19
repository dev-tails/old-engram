import './NoteTextInput.scss';

import { IconButton, TextField } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setNoteBody, setNoteType } from '../../redux/actions/NoteActions';
import { addNote } from '../../redux/actions/NotesActions';
import { ReactComponent as NoteIcon } from '../icons/NoteIcon.svg';
import { NoteType } from '../notes/NotesApi';

type NoteTextInputProps = {};

export const NoteTextInput: React.FC<NoteTextInputProps> = (props) => {
  const { note } = useSelector((state: any) => {
    return { note: state.note };
  });
  const dispatch = useDispatch();

  const types: NoteType[] = ["note", "task", "task_completed", "event"];
  async function handleToggleType() {
    const currentTypeIndex = types.indexOf(note.type || "note");
    let nextTypeIndex = (currentTypeIndex + 1) % types.length;
    setNoteType(dispatch, types[nextTypeIndex]);
  }

  function handleSubmit() {
    addNote(dispatch, note);
  }

  return (
    <div className="note-text-input">
      <IconButton onClick={handleToggleType}>
        <NoteIcon type={note.type} />
      </IconButton>

      <TextField
        className="body"
        autoFocus
        multiline
        rowsMax={8}
        value={note.body}
        onChange={(event) => {
          setNoteBody(dispatch, event.currentTarget.value);
        }}
        fullWidth
        focused={true}
      />

      <IconButton onClick={handleSubmit}>
        <ArrowUpward />
      </IconButton>
    </div>
  );
};
