import React from "react";
import { Note } from "../../notes/NotesApi";
import "./ListWidget.scss";
import { ListWidgetItem } from "./ListWidgetItem/ListWidgetItem";

export type ListWidgetProps = {
  items: Note[];
  onItemChanged?: (item: Partial<Note>, index: number) => void;
  onItemDeleted?: (itemId: string, index: number) => void;
  checkboxes?: boolean;
  hideDelete?: boolean;
};

export const ListWidget: React.FC<ListWidgetProps> = (props) => {
  return (
    <div className="list-widget">
      {props.items.map((item, index) => {
        return (
          <ListWidgetItem key={item._id} index={index} item={item} {...props} />
        );
      })}
    </div>
  );
};
