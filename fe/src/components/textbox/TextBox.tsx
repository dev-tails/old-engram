import './TextBox.scss';

import { IconButton, TextField } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import React, { useRef, useState } from 'react';

import { isMobileUserAgent } from '../../utils/UserAgentUtils';
import { Note } from '../notes/NotesApi';

type TextBoxProps = {
  onSubmit: (note: Partial<Note>) => void;
};

export default function TextBox(props: TextBoxProps) {
  const textFieldRef = useRef<HTMLInputElement | null>(null);
  const [note, setNote] = useState("");

  const handleNoteChanged: React.TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"] = (
    event
  ) => {
    let newNote = event?.target?.value;
    setNote(newNote);
  };

  const handleKeyDown: React.DOMAttributes<HTMLDivElement>["onKeyDown"] = (
    event
  ) => {
    if (event.key === "Enter" && !event.shiftKey && !isMobileUserAgent()) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    props.onSubmit({
      body: note,
    });

    setNote("");

    refocusInput();
  };

  const refocusInput = () => {
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  };

  return (
    <div className="textbox">
      <TextField
        inputRef={textFieldRef}
        autoFocus
        multiline
        rowsMax={2}
        value={note}
        onKeyDown={handleKeyDown}
        onChange={handleNoteChanged}
        fullWidth
        focused={true}
      />

      <IconButton edge="end" size="small" onClick={handleSubmit}>
        <ArrowUpward />
      </IconButton>
    </div>
  );
}
