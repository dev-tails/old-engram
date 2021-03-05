import "./NoteItem.scss";

import React, { useEffect, useRef, useState } from "react";

import { BulletIcon } from "../BulletIcon/BulletIcon";
import { Note } from "../NotesApi";

type NoteItemProps = {
  note: Note;
  focused?: boolean;
  onSave?: (note: Partial<Note>) => void;
  onDelete?: (note: Partial<Note>) => void;
};

export const NoteItem: React.FC<NoteItemProps> = (props) => {
  const noteBodyRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (props.focused) {
      noteBodyRef.current?.focus();
    }
  }, [props.focused]);

  useEffect(() => {
    function keyDownListener(event: KeyboardEvent) {
      if (!focused) {
        return;
      }

      const body = noteBodyRef.current?.innerText;

      if (event.key === "Backspace") {
        if (body === "") {
          event.preventDefault();
          if (props.onDelete) {
            return props.onDelete(props.note);
          }
        }
      }

      if (event.key === "Enter") {
        if (!event.shiftKey) {
          event.preventDefault();

          handleSave({ body });
        }
      }
    }
    document.addEventListener("keydown", keyDownListener);

    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  });

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setFocused(false);
    const newText = e.target.innerText;
    if (newText === props.note.body) {
      return;
    }
    handleSave({
      body: newText,
    });
  };

  const handleSave = (update: Partial<Note>) => {
    if (props.onSave) {
      props.onSave({
        _id: props.note._id,
        ...update,
      });
    }
  };

  return (
    <div className="note-item">
      <BulletIcon note={props.note} />
      <div
        className="note-body"
        ref={noteBodyRef}
        contentEditable
        suppressContentEditableWarning
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {props.note.body}
      </div>
    </div>
  );
};
