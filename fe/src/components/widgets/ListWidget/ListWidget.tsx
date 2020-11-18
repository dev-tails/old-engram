import React from "react";
import { Note } from "../../notes/NotesApi";
import "./ListWidget.scss";

export type ListWidgetProps = {
  items: Note[];
  onItemChanged: (item: Partial<Note>) => void;
};

export const ListWidget: React.FC<ListWidgetProps> = (props) => {
  const handleItemChecked = (item: Note) => {
    props.onItemChanged({
      _id: item._id,
      checked: !item.checked,
    });
  };

  return (
    <div className="list-widget">
      {props.items.map((item) => {
        return (
          <div key={item._id} className="list-item">
            <div className="checkbox">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={handleItemChecked.bind(this, item)}
              />
            </div>
            <div className="item-body">{item.body}</div>
          </div>
        );
      })}
    </div>
  );
};
