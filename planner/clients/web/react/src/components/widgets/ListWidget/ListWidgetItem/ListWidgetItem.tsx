import React, { useState } from "react";
import {
  Archive,
  Delete,
  RadioButtonUnchecked,
  CheckBoxOutlineBlank,
  CheckBox,
  Remove,
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { Note, NoteType } from "../../../notes/NotesApi";
import { dateFromObjectId } from "../../../../utils/ObjectId";
import "./ListWidgetItem.scss";

export type ListAction = "delete" | "archive";

type ListWidgetItemProps = {
  actions?: ListAction[];
  checkboxes?: boolean;
  index: number;
  item: Note;
  onItemChanged?: (item: Partial<Note>, index: number) => void;
  onItemDeleted?: (itemId: string, index: number) => void;
};

export const ListWidgetItem: React.FC<ListWidgetItemProps> = ({
  index,
  item,
  onItemChanged,
  onItemDeleted,
  checkboxes,
  actions,
}) => {
  const [body, setBody] = useState(item.body);
  const [editing, setEditing] = useState(false);

  const dispatchItemChange = (update: Partial<Note>) => {
    if (onItemChanged) {
      onItemChanged(
        {
          ...item,
          ...update,
        },
        index
      );
    }
  };

  const handleToggle = (item: Note, index: number) => {
    dispatchItemChange({
      checked: !item.checked,
    });
  };

  const handleTextChanged = (event: { target: { value: string } }) => {
    const body = event.target.value;
    setBody(body);
  };

  const handleTextBlurred = () => {
    dispatchItemChange({
      body,
    });
    setEditing(false);
  };

  const handleTextClicked = () => {
    setEditing(true);
  };

  const handleKeyDown: React.DOMAttributes<HTMLTextAreaElement>["onKeyDown"] = (
    event
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleTextBlurred();
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    event.currentTarget.selectionStart = body?.length || 0;
  };

  const itemDate = dateFromObjectId(item._id);
  let itemDateString = "";
  if (itemDate) {
    itemDateString = `${itemDate?.toLocaleDateString()} ${itemDate?.toLocaleTimeString()}`;
  }

  const handleToggleType = () => {
    let type = item.type || "note";

    const TYPES: NoteType[] = ["note", "task", "event"];
    const currentTypeIndex = TYPES.indexOf(type);
    const newType = TYPES[(currentTypeIndex + 1) % TYPES.length];
    dispatchItemChange({
      type: newType,
    });
  };

  const handleAction = (action: ListAction) => {
    if (action === "delete") {
      if (item._id && onItemDeleted) {
        onItemDeleted(item._id, index);
      }
    } else if (action === "archive") {
      dispatchItemChange({
        archived: true,
      });
    }
  };

  return (
    <div key={item._id} className="list-widget-item">
      <div className="list-item-left-actions">
        {
          <IconButton edge="start" size="small" onClick={handleToggleType}>
            {(!item.type || item.type === "note") && <Remove />}
            {item.type === "event" && <RadioButtonUnchecked />}
            {item.type === "task" && !item.checked && (
              <CheckBoxOutlineBlank
                onClick={handleToggle.bind(this, item, index)}
              />
            )}
            {item.type === "task" && item.checked && (
              <CheckBox onClick={handleToggle.bind(this, item, index)} />
            )}
          </IconButton>
        }
      </div>
      <div
        className="list-item-content"
        onClick={handleTextClicked}
        onBlur={setEditing.bind(this, false)}
      >
        <div className="list-item-text">
          {editing ? (
            <textarea
              value={body}
              autoFocus
              onChange={handleTextChanged}
              onFocus={handleFocus}
              onBlur={handleTextBlurred}
              onKeyDown={handleKeyDown}
              rows={(body?.match(/\n/g) || []).length + 1}
            ></textarea>
          ) : (
            <div>{body || ""}</div>
          )}
        </div>
        {itemDateString && (
          <div className="list-item-secondary">{itemDateString}</div>
        )}
      </div>
      <div className="list-item-actions">
        {actions &&
          actions.map((action) => {
            return (
              <IconButton
                key={action}
                size="small"
                onClick={handleAction.bind(this, action)}
              >
                {action === "delete" && <Delete />}
                {action === "archive" && <Archive />}
              </IconButton>
            );
          })}
      </div>
    </div>
  );
};
