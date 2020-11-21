import React, { useEffect, useRef } from "react";
import { Note } from "../../notes/NotesApi";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
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

  const handleToggle = (item: Note) => () => {
    onItemChanged({
      _id: item._id,
      checked: !item.checked,
    });
  };

  return (
    <div className="list-widget">
      <List>
        {items.map((item, index) => {
          const labelId = `checkbox-list-label-${item._id}`;

          return (
            <ListItem
              key={item._id}
              role={undefined}
              dense
              button
              ref={index === items.length - 1 ? lastItemRef : null}
            >
              {checkboxes && (
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={item.checked}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                    onClick={handleToggle(item)}
                  />
                </ListItemIcon>
              )}
              <ListItemText
                id={labelId}
                primary={item.body}
                primaryTypographyProps={{
                  style: {
                    whiteSpace: "break-spaces",
                    wordBreak: "break-word",
                  },
                }}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    onItemDeleted(item._id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
