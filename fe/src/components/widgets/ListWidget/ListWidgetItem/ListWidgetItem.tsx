import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Delete } from "@material-ui/icons";
import { Checkbox, IconButton } from "@material-ui/core";
import { Note } from "../../../notes/NotesApi";
import { dateFromObjectId } from "../../../../utils/ObjectId";
import "./ListWidgetItem.scss";

type ListWidgetItemProps = {
  checkboxes?: boolean;
  hideDelete?: boolean;
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
  hideDelete,
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
          ...update,
          _id: item._id,
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

  const itemDate = dateFromObjectId(item._id);
  const itemDateString = `${itemDate?.toLocaleDateString()} ${itemDate?.toLocaleTimeString()}`;

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
              onBlur={handleTextBlurred}
            ></textarea>
          ) : (
            <ReactMarkdown>{item.body}</ReactMarkdown>
          )}
        </div>
        <div className="list-item-secondary">{itemDateString}</div>
      </div>
      {hideDelete ?? (
        <div
          className="list-item-actions"
          onClick={
            onItemDeleted && item._id
              ? onItemDeleted.bind(this, item._id, index)
              : () => {}
          }
        >
          <IconButton size="small">
            <Delete />
          </IconButton>
        </div>
      )}
    </div>
  );
};
