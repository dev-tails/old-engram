import React, { useEffect, useRef } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export type CheckboxItem = {
  _id?: string;
  checked?: boolean;
  body: string;
};

export type CheckboxListProps = {
  items: CheckboxItem[];
  onChecked: (item: CheckboxItem) => void;
  onDelete: (itemId?: string) => void;
};

export const CheckboxList: React.FC<CheckboxListProps> = ({
  items,
  onChecked,
  onDelete,
}) => {
  const lastItemRef = useRef<any>();
  useEffect(() => {
    if (!lastItemRef || !lastItemRef.current) {
      return;
    }
    lastItemRef.current?.scrollIntoView({ behaviour: "auto" });
  }, [items]);

  const handleToggle = (item: CheckboxItem) => () => {
    onChecked(item);
  };

  return (
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
            <ListItemText id={labelId} primary={item.body} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  onDelete(item._id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};
