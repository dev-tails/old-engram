import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';

import { Note } from '../api/NoteApi';
import { ListItemTitle } from '../components/Themed';
import { getBackgroundColor, getTextColor, getTintColor } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

type NoteListItemProps = {
  selected: boolean;
  item: Note;
  onPress: () => void;
  onLongPress: () => void;
  onToggleIcon: (item: Note) => void;
  onUpdateNote: (update: Partial<Note>) => void;
};

const NoteListItem: React.FC<NoteListItemProps> = ({
  selected,
  item,
  onPress,
  onLongPress,
  onToggleIcon,
  onUpdateNote,
}) => {
  const theme = useColorScheme();

  const additionalTitleStyles: any = {};

  const disabledColor = "#424242";

  if (item.type === "task_completed") {
    additionalTitleStyles.color = disabledColor;
  }

  const styles = StyleSheet.create({
    listItem: {
      backgroundColor: selected
        ? getTintColor(theme)
        : getBackgroundColor(theme),
    },
  });

  function getIconNameForType(type: string): string {
    const typeToIconMap: { [key: string]: string } = {
      note: "remove",
      task: "check-box-outline-blank",
      task_completed: "check-box",
      event: "radio-button-unchecked",
    };
    return typeToIconMap[type];
  }

  function handleTimeChanged(event: any, date: Date | undefined) {
    const start = date ? date.toISOString() : "";

    onUpdateNote({
      _id: item._id,
      type: item.type, // TODO: API currently defaults back to note
      start,
    });
  }

  return (
    <ListItem
      containerStyle={styles.listItem}
      onLongPress={onLongPress}
      onPress={onPress}
    >
      <Button
        type="clear"
        buttonStyle={{ padding: 0 }}
        icon={
          <Icon
            name={getIconNameForType(item.type)}
            color={
              item.type === "task_completed"
                ? disabledColor
                : getTextColor(theme)
            }
          />
        }
        onPress={() => {
          onToggleIcon(item);
        }}
      ></Button>
      {item.type === "event" ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={moment(item.start).toDate()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChanged}
          textColor="red"
          style={{ width: 80 }}
        />
      ) : null}
      <ListItem.Content>
        <ListItemTitle
          style={{
            ...(item.type === "task_completed" ? { color: disabledColor } : {}),
          }}
        >
          {item.body}
        </ListItemTitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default memo(NoteListItem);
