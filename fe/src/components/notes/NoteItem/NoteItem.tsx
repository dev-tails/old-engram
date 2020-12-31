import './NoteItem.scss';

import { TextareaAutosize } from '@material-ui/core';
import React, { useState } from 'react';

import { BulletIcon } from '../BulletIcon/BulletIcon';
import { Note } from '../NotesApi';

type NoteItemProps = {
  note: Note;
  onSave: (note: Note) => void;
};

export const NoteItem: React.FC<NoteItemProps> = (props) => {
  const [body, setBody] = useState(props.note.body);

  const handleTextChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.currentTarget.value);
  };

  const handleSave = () => {
    if (body === props.note.body) {
      return;
    }

    props.onSave({
      ...props.note,
      body,
    });
  };

  return (
    <div className="note-item">
      <BulletIcon note={props.note} />
      <TextareaAutosize
        value={body}
        onChange={handleTextChanged}
        onBlur={handleSave}
      />
    </div>
  );
};
