import './NoteTextInput.scss';

import { IconButton, TextField } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import moment from 'moment';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNote } from '../../redux/actions/NotesActions';
import { isMobileUserAgent } from '../../utils/UserAgentUtils';
import { NoteIcon } from '../notes/NoteIcon/NoteIcon';
import { NoteType } from '../notes/NotesApi';

type NoteTextInputProps = {};

export const NoteTextInput: React.FC<NoteTextInputProps> = (props) => {
  const textfieldRef = useRef<any>(null);

  const date = useSelector((state: any) => state.date);
  const dateString = moment(date).format("YYYY-MM-DD");

  const [type, setType] = useState<NoteType>("note");
  const [body, setBody] = useState("");

  const dispatch = useDispatch();

  const types: NoteType[] = ["note", "task", "task_completed", "event"];
  function handleToggleType() {
    const currentTypeIndex = types.indexOf(type || "note");
    let nextTypeIndex = (currentTypeIndex + 1) % types.length;
    setType(types[nextTypeIndex]);
  }

  const handleKeyDown: React.DOMAttributes<HTMLDivElement>["onKeyDown"] = (
    event
  ) => {
    if (event.key === "Enter" && !event.shiftKey && !isMobileUserAgent()) {
      event.preventDefault();
      handleSubmit();
    }
  };

  function handleSubmit() {
    addNote(dispatch, {
      type,
      body,
      date: dateString,
    });
    setBody("");
    textfieldRef.current?.focus();
  }

  return (
    <div className="note-text-input">
      <IconButton className="icon" onClick={handleToggleType}>
        <NoteIcon type={type} />
      </IconButton>

      <TextField
        ref={textfieldRef}
        autoFocus
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
