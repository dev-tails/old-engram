import React, { useEffect, useRef } from "react";
import { Note } from "../../notes/NotesApi";
import { dateFromObjectId } from "../../../utils/ObjectId";
import "./ListWidget.scss";

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
      {items.map((item) => {
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
          >
            <div className="list-item-text">{item.body}</div>
            <div className="list-item-secondary">{itemDateString}</div>
          </div>
        );
      })}
    </div>
  );
};
