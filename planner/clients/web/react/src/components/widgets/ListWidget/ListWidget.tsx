import React from "react";
import { Note } from "../../notes/NotesApi";
import "./ListWidget.scss";
import { ListAction, ListWidgetItem } from "./ListWidgetItem/ListWidgetItem";

export type ListWidgetProps = {
  items: Note[];
  onItemChanged?: (item: Partial<Note>, index: number) => void;
  onItemDeleted?: (itemId: string, index: number) => void;
  checkboxes?: boolean;
  actions?: ListAction[];
  showArchived?: boolean;
};

export const ListWidget: React.FC<ListWidgetProps> = (props) => {
  return (
    <div className="list-widget">
      {props.items.map((item, index) => {
        if (!props.showArchived && item.archived) {
          return null;
        }

        return (
          <ListWidgetItem key={item._id} index={index} item={item} {...props} />
        );
      })}
    </div>
  );
};
