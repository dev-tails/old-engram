import React, { useEffect, useRef } from "react";
import { Note } from "../../notes/NotesApi";
import { dateFromObjectId } from "../../../utils/ObjectId";
import "./ListWidget.scss";
import { Delete } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import Autolinker from "autolinker";

export type ListWidgetProps = {
  items: Note[];
  onItemChanged: (item: Partial<Note>) => void;
  onItemDeleted: (itemId?: string) => void;
  checkboxes?: boolean;
};

export const ListWidget: React.FC<ListWidgetProps> = ({
  items,
  onItemChanged,
  onItemDeleted,
  checkboxes,
}) => {
  const lastItemRef = useRef<any>();
  useEffect(() => {
    if (!lastItemRef || !lastItemRef.current) {
      return;
    }
    lastItemRef.current?.scrollIntoView({ behaviour: "auto" });
  }, [items]);

  // const handleToggle = (item: Note) => () => {
  //   onItemChanged({
  //     _id: item._id,
  //     checked: !item.checked,
  //   });
  // };

  const handleItemClicked = (item: Note, event: any) => {};

  return (
    <div className="list-widget">
      {items.map((item, index) => {
        if (!item.body) {
          return null;
        }

        const itemDate = dateFromObjectId(item._id);
        const itemDateString = `${itemDate?.toLocaleDateString()} ${itemDate?.toLocaleTimeString()}`;

        return (
          <div
            key={item._id}
            className="list-item"
            onClick={handleItemClicked.bind(this, item)}
            ref={index === items.length - 1 ? lastItemRef : null}
          >
            <div className="list-item-content">
              <div
                className="list-item-text"
                dangerouslySetInnerHTML={{ __html: Autolinker.link(item.body) }}
              ></div>
              <div className="list-item-secondary">{itemDateString}</div>
            </div>
            <div
              className="list-item-actions"
              onClick={onItemDeleted.bind(this, item._id)}
            >
              <IconButton size="small">
                <Delete />
              </IconButton>
            </div>
          </div>
        );
      })}
    </div>
  );
};
