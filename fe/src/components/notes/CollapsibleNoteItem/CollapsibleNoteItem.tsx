import { TextareaAutosize } from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import React, { useEffect, useState } from "react";
import { BulletIcon } from "../BulletIcon/BulletIcon";
import "./CollapsibleNoteItem.scss";

type CollapsibleNote = {
  _id: string;
  body: string;
  prev?: string;
  parent?: string;
  next?: string;
  children?: CollapsibleNote[];
};

type CollapsibleNoteItemProps = {
  note: CollapsibleNote;
  onSave: (note: CollapsibleNote) => void;
  onUnindent?: (note: CollapsibleNote) => void;
  onIndent?: (note: CollapsibleNote) => void;
};

export const CollapsibleNoteItem: React.FC<CollapsibleNoteItemProps> = (
  props
) => {
  const [body, setBody] = useState(props.note.body);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
      }
    });
  });

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

  const handleToggleExpand = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="collapsible-note-item-wrapper">
      <div className="collapsible-note-item">
        <span className="block-expand" onClick={handleToggleExpand}>
          {collapsed ? (
            <ArrowRightIcon fontSize="small" />
          ) : (
            <ArrowDropDownIcon fontSize="small" />
          )}
        </span>
        <BulletIcon />
        <TextareaAutosize
          value={body}
          onChange={handleTextChanged}
          onBlur={handleSave}
        />
      </div>
      {!collapsed && props.note.children && (
        <div style={{ marginLeft: "12px" }}>
          {props.note.children.map((childNote) => {
            return (
              <CollapsibleNoteItem
                key={childNote._id}
                note={childNote}
                onSave={() => {}}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
