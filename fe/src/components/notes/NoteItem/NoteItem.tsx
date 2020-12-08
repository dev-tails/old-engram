import { TextareaAutosize } from "@material-ui/core";
import React, { useState } from "react";
import { Note } from "../NotesApi";
import { NoteIcon } from "./NoteIcon";
import "./NoteItem.scss";

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
    props.onSave({
      ...props.note,
      body,
    });
  };

  return (
    <div className="note-item">
      <NoteIcon />
      <TextareaAutosize
        value={body}
        onChange={handleTextChanged}
        onBlur={handleSave}
      />
    </div>
  );
};