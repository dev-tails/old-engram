import React, { memo } from 'react';
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
};

const NoteListItem: React.FC<NoteListItemProps> = ({
  selected,
  item,
  onPress,
  onLongPress,
  onToggleIcon,
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

  return (
    <ListItem
      containerStyle={styles.listItem}
      onLongPress={onLongPress}
      onPress={onPress}
    >
      <Button
        type="clear"
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
