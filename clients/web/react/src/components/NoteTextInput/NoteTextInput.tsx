import './NoteTextInput.scss';

import { IconButton, TextField } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setNote } from '../../redux/actions/NoteActions';
import { addNote, updateNote } from '../../redux/actions/NotesActions';
import { NoteIcon } from '../notes/NoteIcon/NoteIcon';
import { NoteType } from '../notes/NotesApi';

type NoteTextInputProps = {};

export const NoteTextInput: React.FC<NoteTextInputProps> = (props) => {
  const { typeFilter, date, note } = useSelector((state: any) => {
    return { date: state.date, note: state.note, typeFilter: state.type };
  });
  const dateString = moment(date).format("YYYY-MM-DD");

  const [type, setType] = useState<NoteType>("note");
  const [body, setBody] = useState("");

  const dispatch = useDispatch();

  const types: NoteType[] = ["note", "task", "task_completed", "event"];

  useEffect(() => {
    if (note) {
      setType(note.type);
      setBody(note.body);
    } else {
      setBody("");
    }
  }, [note]);

  useEffect(() => {
    setType(types.includes(typeFilter) ? typeFilter : "note");
  }, [types, typeFilter]);

  function handleToggleType() {
    const currentTypeIndex = types.indexOf(type || "note");
    let nextTypeIndex = (currentTypeIndex + 1) % types.length;
    setType(types[nextTypeIndex]);
  }

  const handleKeyDown: React.DOMAttributes<HTMLDivElement>["onKeyDown"] = (
    event
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  function handleSubmit() {
    const noteUpdate = {
      type,
      body,
      date: dateString,
    };

    if (note) {
      updateNote(dispatch, {
        ...note,
        ...noteUpdate,
      });
      setNote(dispatch, null);
    } else {
      addNote(dispatch, noteUpdate);
    }
    setBody("");
  }

  return (
    <div className="note-text-input">
      <IconButton className="icon" onClick={handleToggleType}>
        <NoteIcon type={type} />
      </IconButton>

      <TextField
        autoFocus
        inputProps={{
          enterkeyhint: "send",
        }}
        onKeyDown={handleKeyDown}
        className="body"
        multiline
        rowsMax={8}
        value={body}
        onChange={(event) => {
          setBody(event.currentTarget.value);
        }}
        fullWidth
      />

      <IconButton className="submit icon" onClick={handleSubmit}>
        <ArrowUpward />
      </IconButton>
    </div>
  );
};
