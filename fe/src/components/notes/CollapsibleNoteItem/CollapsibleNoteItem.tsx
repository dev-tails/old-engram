import "./CollapsibleNoteItem.scss";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import React, { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Link } from "react-router-dom";

import { BulletIcon } from "../BulletIcon/BulletIcon";
import { Note, NoteType } from "../NotesApi";
import { Markdown } from "../../Markdown/Markdown";
import { isUndefined } from "lodash";

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
  active?: boolean;
  activeId?: string;
  onUnindent?: (note: CollapsibleNote) => void;
  onIndent?: (note: CollapsibleNote) => void;
  onSave: (note: CollapsibleNote) => void;
  onNewNote?: (note: CollapsibleNote) => void;
  onActivate: (note: CollapsibleNote) => void;
  onDelete: (note: CollapsibleNote) => void;
  onBlur: () => void;
  onDrop?: (droppedItem: Note, itemDroppedOnto: Note) => void;
};

export const CollapsibleNoteItem: React.FC<CollapsibleNoteItemProps> = (
  props
) => {
  const noteBodyRef = useRef<HTMLDivElement>(null);
  const [type, setType] = useState(props.note.type || props.defaultType);
  const [collapsed, setCollapsed] = useState(false);

  const [isDragging, drag] = useDrag(() => ({
    type: type as string,
    item: props.note,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ["note", "task", "event", "task_completed"],
      drop: (droppedItem: Note) => {
        if (props.onDrop) {
          props.onDrop(droppedItem, props.note);
        }
      },
      collect(monitor) {
        return {
          isOver: !!monitor.isOver(),
        };
      },
    }),
    []
  );

  const isActive = isUndefined(props.active)
    ? props.activeId === props.note.localId
    : props.active;
  const hasChildren = props.note.children && props.note.children.length > 0;

  const note = {
    ...props.note,
    type,
  };

  useEffect(() => {
    if (isActive) {
      noteBodyRef.current?.focus();
    }
  }, [isActive]);

  useEffect(() => {
    function keyDownListener(event: KeyboardEvent) {
      if (!isActive) {
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        event.stopPropagation();

        if (event.shiftKey) {
          if (props.onUnindent) {
            props.onUnindent(getCurrentNote());
          }
        } else {
          if (props.onIndent) {
            props.onIndent(getCurrentNote());
          }
        }
      }

      if (event.key === "Backspace") {
        if (getBody() === "") {
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

          // TODO: This is a hack to get this working in both HomePage and EditNotePage
          if (isUndefined(props.active) === false) {
            handleSave();
          }

          if (props.note.localId) {
            handleNewNote();
          }
        }
      }
    }
    document.addEventListener("keydown", keyDownListener);

    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  });

  const getCurrentNote = () => {
    return {
      ...note,
      type,
      body: getBody(),
    };
  };

  const handleSave = (update?: Partial<Note>) => {
    props.onSave({
      ...note,
      body: getBody(),
      ...update,
    });
  };

  const getBody = () => {
    return noteBodyRef.current?.innerText;
  };

  const handleTextAreaBlur = () => {
    props.onBlur();

    const body = noteBodyRef.current?.innerText;
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
    return props.note.body?.replaceAll("\n\n", `\n&nbsp;\n`) || "";
  }

  return (
    <div className={`collapsible-note-item-wrapper ${type}`}>
      <div
        ref={drag}
        className={`collapsible-note-item ${isDragging ? "dragging" : ""}`}
        onClick={handleNoteClicked}
      >
        <div ref={drop} className="drop-container">
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
          <div
            className="note-text"
            ref={noteBodyRef}
            contentEditable={true}
            suppressContentEditableWarning
            onBlur={handleTextAreaBlur}
          >
            <Markdown
              body={isActive ? props.note.body || "" : getBodyForMarkdown()}
            ></Markdown>
          </div>
        </div>
      </div>
      <div className={`divider ${isOver ? "highlight" : ""}`} />
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
