import './TextBox.scss';

import { IconButton, List, ListItem, ListItemText, SvgIcon, TextField } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';

import { isMobileUserAgent } from '../../utils/UserAgentUtils';
import { ReactComponent as NoteIcon } from '../icons/NoteIcon.svg';
import { Note } from '../notes/NotesApi';

type TextBoxProps = {
  initialBody: string;
  focused: boolean;
  onSubmit: (note: Partial<Note>) => void;
};

export default function TextBox(props: TextBoxProps) {
  const textFieldRef = useRef<HTMLInputElement | null>(null);
  const [note, setNote] = useState(props.initialBody);

  useEffect(() => {
    if (props.focused) {
      refocusInput();
    }
  }, [props.focused]);

  useEffect(() => {
    if (props.initialBody) {
      setNote(props.initialBody);
    }
  }, [props.initialBody]);

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

  const iconComponent = NoteIcon;

  return (
    <div className="textbox">
      <List disablePadding={true}>
        <ListItem>
          <IconButton edge="start" onClick={handleSubmit}>
            <SvgIcon component={iconComponent} />
          </IconButton>

          <ListItemText>
            <TextField
              inputRef={textFieldRef}
              autoFocus
              multiline
              rowsMax={8}
              value={note}
              onKeyDown={handleKeyDown}
              onChange={handleNoteChanged}
              fullWidth
              focused={true}
            />
          </ListItemText>

          <IconButton edge="end" onClick={handleSubmit}>
            <ArrowUpward />
          </IconButton>
        </ListItem>
      </List>
    </div>
  );
}
