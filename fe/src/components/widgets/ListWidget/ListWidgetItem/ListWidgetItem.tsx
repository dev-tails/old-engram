import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Archive, Delete } from "@material-ui/icons";
import { Checkbox, IconButton } from "@material-ui/core";
import { Note } from "../../../notes/NotesApi";
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

  if (!item.body) {
    return null;
  }

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
    event.currentTarget.selectionStart = body.length;
  };

  const itemDate = dateFromObjectId(item._id);
  const itemDateString = `${itemDate?.toLocaleDateString()} ${itemDate?.toLocaleTimeString()}`;

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
        {checkboxes && (
          <Checkbox
            checked={item.checked}
            onChange={handleToggle.bind(this, item, index)}
          />
        )}
      </div>
      <div className="list-item-content">
        <div
          className="list-item-text"
          onClick={handleTextClicked}
          onBlur={setEditing.bind(this, false)}
        >
          {editing ? (
            <textarea
              value={body}
              autoFocus
              onChange={handleTextChanged}
              onFocus={handleFocus}
              onBlur={handleTextBlurred}
              onKeyDown={handleKeyDown}
              rows={(body.match(/\n/g) || []).length + 1}
            ></textarea>
          ) : (
            <ReactMarkdown>{item.body}</ReactMarkdown>
          )}
        </div>
        <div className="list-item-secondary">{itemDateString}</div>
      </div>
      <div className="list-item-actions">
        {actions &&
          actions.map((action) => {
            return (
              <IconButton
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
