import React, { memo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Note } from '../api/NoteApi';
import NoteListItem from '../components/NoteListItem';
import useColorScheme from '../hooks/useColorScheme';

type NoteListProps = {
  notes: Note[];
  selectedNoteId: string;
  inverted: boolean;
  onNotePress: (note: Note) => void;
  onNoteLongPress: (note: Note) => void;
  onToggleNoteIcon: (note: Note) => void;
  onUpdateNote: (update: Partial<Note>) => void;
};

const NoteList = ({
  notes,
  selectedNoteId,
  inverted,
  onNotePress,
  onNoteLongPress,
  onToggleNoteIcon,
  onUpdateNote,
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
      inverted={inverted}
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
            onUpdateNote={(update) => {
              onUpdateNote(update);
            }}
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
