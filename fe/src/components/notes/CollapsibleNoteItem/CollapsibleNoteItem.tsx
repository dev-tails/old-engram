import "./CollapsibleNoteItem.scss";

import { TextareaAutosize } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import React, { useEffect, useRef, useState } from "react";

import { Markdown } from "../../Markdown/Markdown";
import { BulletIcon } from "../BulletIcon/BulletIcon";
import { Note, NoteType } from "../NotesApi";
import { Link } from "react-router-dom";

export type CollapsibleNote = {
  _id?: string;
  localId?: string;
  start?: Date;
  type?: NoteType;
  body?: string;
  prev?: string;
  parent?: string;
  children?: CollapsibleNote[];
};

type CollapsibleNoteItemProps = {
  note: CollapsibleNote;
  defaultType?: NoteType;
  active: boolean;
  onSave: (note: CollapsibleNote) => void;
  onUnindent?: (note: CollapsibleNote) => void;
  onIndent?: (note: CollapsibleNote) => void;
  onNewNote?: (note: CollapsibleNote) => void;
  onActivate: (note: CollapsibleNote) => void;
  onDelete: (note: CollapsibleNote) => void;
  onBlur: () => void;
};

export const CollapsibleNoteItem: React.FC<CollapsibleNoteItemProps> = (
  props
) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [body, setBody] = useState(props.note.body);
  const [type, setType] = useState(props.note.type || props.defaultType);
  const [collapsed, setCollapsed] = useState(false);

  const isActive = props.active;
  const hasChildren = props.note.children && props.note.children.length > 0;

  const note = {
    ...props.note,
    body,
    type,
  };

  useEffect(() => {
    function keyDownListener(event: KeyboardEvent) {
      if (!isActive) {
        return;
      }

      if (event.key === "Backspace") {
        if (body === "") {
          event.preventDefault();
          return props.onDelete(props.note);
        }
      }

      if (event.key === "Enter") {
        if (event.ctrlKey) {
          event.preventDefault();

          handleChangeType();
        } else if (!event.shiftKey) {
          event.preventDefault();

          handleSave();

          if (props.note.localId) {
            handleNewNote();
          }
        }
      }

      // Temporarily disable indenting until working better
      // if (event.key === "Tab") {
      //   event.preventDefault();
      //   event.stopPropagation();

      //   const updatedNote = {
      //     ...props.note,
      //     body,
      //   };

      //   if (event.shiftKey) {
      //     props.onUnindent && props.onUnindent(updatedNote);
      //   } else {
      //     props.onIndent && props.onIndent(updatedNote);
      //   }
      // }
    }
    document.addEventListener("keydown", keyDownListener);

    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  });

  const handleTextChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.currentTarget.value);
  };

  const handleSave = (update?: Partial<Note>) => {
    if (!body && note.localId) {
      props.onDelete(note);
      return;
    }

    props.onSave({
      ...note,
      ...update,
    });
  };

  const handleTextAreaBlur = () => {
    props.onBlur();

    if (body === props.note.body) {
      return;
    }
    handleSave({
      body,
    });
  };

  const handleNewNote = () => {
    if (props.onNewNote) {
      props.onNewNote(props.note);
    }
  };

  const handleToggleExpand = () => {
    setCollapsed(!collapsed);
  };

  const handleChangeType = () => {
    if (note.type === "event") {
      return;
    }

    const TYPES: NoteType[] = ["note", "task", "task_completed"];
    const currentIndex = TYPES.indexOf(note.type || "note");
    let newIndex = currentIndex + 1;
    if (newIndex >= TYPES.length) {
      newIndex = 0;
    }

    const newType = TYPES[newIndex];

    setType(newType);
    handleSave({ type: newType });
  };

  const handleNoteClicked = () => {
    props.onActivate(props.note);
  };

  function getBodyForMarkdown() {
    return body?.replaceAll("\n\n", `\n&nbsp;\n`) || "";
  }

  return (
    <div className={`collapsible-note-item-wrapper ${type}`}>
      <div
        className={`collapsible-note-item ${!props.note.body ? "empty" : ""}`}
        onClick={handleNoteClicked}
      >
        <span
          className={`block-expand ${hasChildren ? "" : "hidden"}`}
          onClick={handleToggleExpand}
        >
          {collapsed ? (
            <ArrowRightIcon fontSize="small" />
          ) : (
            <ArrowDropDownIcon fontSize="small" />
          )}
        </span>
        <Link to={`/notes/${note.localId}`}>
          <span className={`block-edit`} onClick={handleToggleExpand}>
            <svg height="8" width="8" fill="#FFF">
              <circle cx="4" cy="1" r="1" />
              <circle cx="4" cy="4" r="1" />
              <circle cx="4" cy="7" r="1" />
            </svg>
          </span>
        </Link>
        <div className="bullet-icon-wrapper" onClick={handleChangeType}>
          <BulletIcon note={note} />
        </div>

        {isActive ? (
          <TextareaAutosize
            ref={textAreaRef}
            value={body}
            onChange={handleTextChanged}
            onBlur={handleTextAreaBlur}
            autoFocus={isActive}
          />
        ) : (
          <div className="note-inactive">
            <Markdown body={getBodyForMarkdown()} />
          </div>
        )}
      </div>
      {!collapsed && props.note.children && (
        <div style={{ marginLeft: "12px" }}>
          {props.note.children.map((childNote) => {
            return (
              <CollapsibleNoteItem
                {...props}
                key={childNote.localId}
                note={childNote}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
