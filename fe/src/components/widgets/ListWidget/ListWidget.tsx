import React, { useEffect, useRef } from "react";
import { Note } from "../../notes/NotesApi";
import { dateFromObjectId } from "../../../utils/ObjectId";
import "./ListWidget.scss";
import { Delete } from "@material-ui/icons";
import { Checkbox, IconButton } from "@material-ui/core";
import Autolinker from "autolinker";

export type ListWidgetProps = {
  items: Note[];
  onItemChanged?: (item: Partial<Note>, index: number) => void;
  onItemDeleted?: (itemId: string, index: number) => void;
  checkboxes?: boolean;
  hideDelete?: boolean;
};

export const ListWidget: React.FC<ListWidgetProps> = ({
  items,
  onItemChanged,
  onItemDeleted,
  checkboxes,
  hideDelete,
}) => {
  const handleToggle = (item: Note, index: number) => {
    if (onItemChanged) {
      onItemChanged(
        {
          _id: item._id,
          checked: !item.checked,
        },
        index
      );
    }
  };

  return (
    <div className="list-widget">
      {items.map((item, index) => {
        if (!item.body) {
          return null;
        }

        const itemDate = dateFromObjectId(item._id);
        const itemDateString = `${itemDate?.toLocaleDateString()} ${itemDate?.toLocaleTimeString()}`;

        return (
          <div key={item._id} className="list-item">
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
                dangerouslySetInnerHTML={{ __html: Autolinker.link(item.body) }}
              ></div>
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
      })}
    </div>
  );
};
