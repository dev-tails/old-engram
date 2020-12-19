import { TextareaAutosize } from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import React, { useEffect, useRef, useState } from "react";
import { BulletIcon } from "../BulletIcon/BulletIcon";
import "./CollapsibleNoteItem.scss";
import { Note, NoteType } from "../NotesApi";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Link } from "react-router-dom";

export type CollapsibleNote = {
  _id?: string;
  type?: NoteType;
  body: string;
  prev?: string;
  parent?: string;
  children?: CollapsibleNote[];
};

type CollapsibleNoteItemProps = {
  note: CollapsibleNote;
  activeId: string | null;
  onSave: (note: CollapsibleNote) => void;
  onUnindent?: (note: CollapsibleNote) => void;
  onIndent?: (note: CollapsibleNote) => void;
  onNewNote?: (note: CollapsibleNote) => void;
  onActivate: (note: CollapsibleNote) => void;
  onDelete: (note: CollapsibleNote) => void;
};

export const CollapsibleNoteItem: React.FC<CollapsibleNoteItemProps> = (
  props
) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [body, setBody] = useState(props.note.body);
  const [type, setType] = useState(props.note.type);
  const [collapsed, setCollapsed] = useState(false);

  const isActive = props.activeId === props.note._id;
  const hasChildren = props.note.children && props.note.children.length > 0;

  const note = {
    ...props.note,
    body,
    type,
  };

  useEffect(() => {
    function keyDownListener(event: KeyboardEvent) {
      if (props.activeId !== props.note._id) {
        return;
      }

      if (event.key === "Backspace") {
        if (body === "") {
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

          if (props.note._id) {
            handleNewNote();
          }
        }
      }

      if (event.key === "Tab") {
        event.preventDefault();
        event.stopPropagation();

        const updatedNote = {
          ...props.note,
          body,
        };

        if (event.shiftKey) {
          props.onUnindent && props.onUnindent(updatedNote);
        } else {
          props.onIndent && props.onIndent(updatedNote);
        }
      }
    }
    document.addEventListener("keydown", keyDownListener);

    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  });

  useEffect(() => {
    if (props.activeId === props.note._id && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [props.activeId, props.note._id]);

  const handleTextChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.currentTarget.value);
  };

  const handleSave = (update?: Partial<Note>) => {
    if (body === props.note.body) {
      return;
    }

    props.onSave({
      ...note,
      ...update,
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
    const TYPES: NoteType[] = ["note", "task", "task_completed", "event"];
    const currentIndex = TYPES.indexOf(note.type || "note");
    let newIndex = currentIndex + 1;
    if (currentIndex > TYPES.length) {
      newIndex = 0;
    }

    const newType = TYPES[newIndex];

    setType(newType);
    handleSave({ type: newType });
  };

  function getBodyForMarkdown() {
    return body.replaceAll("\n", `\n&nbsp;`);
  }

  return (
    <div className="collapsible-note-item-wrapper">
      <div
        className="collapsible-note-item"
        onClick={props.onActivate.bind(this, props.note)}
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
        <Link to={`/notes/${note._id}`}>
          <span className={`block-edit`} onClick={handleToggleExpand}>
            <svg height="8" width="8">
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
            onBlur={handleSave.bind(this, {})}
          />
        ) : (
          <div className="note-inactive">
            <ReactMarkdown plugins={[gfm]}>
              {getBodyForMarkdown()}
            </ReactMarkdown>
          </div>
        )}
      </div>
      {!collapsed && props.note.children && (
        <div style={{ marginLeft: "12px" }}>
          {props.note.children.map((childNote) => {
            return (
              <CollapsibleNoteItem
                {...props}
                key={childNote._id}
                note={childNote}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
