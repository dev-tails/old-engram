import React from "react";
import { Note } from "../../notes/NotesApi";
import "./ListWidget.scss";

type ListWidgetProps = {
  items: Note[];
};

export const ListWidget: React.FC<ListWidgetProps> = (props) => {
  return (
    <div className="list-widget">
      {props.items.map((item) => {
        return (
          <div className="list-item">
            <div className="checkbox">
              <input type="checkbox" checked={item.checked} />
            </div>
            <div className="item-body">{item.body}</div>
          </div>
        );
      })}
    </div>
  );
};
