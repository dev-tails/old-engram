import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
};

export const CheckboxList: React.FC<CheckboxListProps> = ({
  items,
  onChecked,
}) => {
  const handleToggle = (item: CheckboxItem) => () => {
    onChecked(item);
  };

  return (
    <List>
      {items.map((item) => {
        const labelId = `checkbox-list-label-${item._id}`;

        return (
          <ListItem
            key={item._id}
            role={undefined}
            dense
            button
            onClick={handleToggle(item)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={item.checked}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={item.body} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};
