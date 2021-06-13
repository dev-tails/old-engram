import React, { memo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Note } from '../api/NoteApi';
import NoteListItem from '../components/NoteListItem';
import useColorScheme from '../hooks/useColorScheme';

type NoteListProps = {
  selectedNoteId: string;
  notes: Note[];
  onNotePress: (note: Note) => void;
  onNoteLongPress: (note: Note) => void;
  onToggleNoteIcon: (note: Note) => void;
};

const NoteList = ({
  selectedNoteId,
  notes,
  onNotePress,
  onNoteLongPress,
  onToggleNoteIcon,
}: NoteListProps) => {
  const theme = useColorScheme();

  const styles = StyleSheet.create({
    list: {
      flexGrow: 1,
      width: "100%",
      maxWidth: 800,
      margin: "auto",
    },
    listItemSeparator: {
      height: 1,
      width: "100%",
      backgroundColor: theme === "light" ? "#EEE" : "#424242",
    },
  });

  const Separator = () => {
    return <View style={styles.listItemSeparator}></View>;
  };

  return (
    <FlatList
      inverted={true}
      keyExtractor={(item, index) => {
        if (item._id) {
          return item._id;
        } else {
          return item.localId;
        }
      }}
      style={styles.list}
      data={notes}
      ItemSeparatorComponent={Separator}
      renderItem={({ item }) => {
        return (
          <NoteListItem
            selected={selectedNoteId === item._id}
            item={item}
            onPress={() => {
              onNotePress(item);
            }}
            onLongPress={() => onNoteLongPress(item)}
            onToggleIcon={() => {
              onToggleNoteIcon(item);
            }}
          />
        );
      }}
    />
  );
};

export default memo(NoteList);
