import React from "react";
import { CheckboxList } from "../../CheckboxList/CheckboxList";
import { Note } from "../../notes/NotesApi";
import "./ListWidget.scss";

export type ListWidgetProps = {
  items: Note[];
  onItemChanged: (item: Partial<Note>) => void;
  onItemDeleted: (itemId?: string) => void;
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
      <CheckboxList
        onChecked={handleItemChecked}
        onDelete={props.onItemDeleted}
        items={props.items}
      />
    </div>
  );
};
