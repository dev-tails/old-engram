import moment from 'moment';
import * as React from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { BottomSheet, ListItem } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { Note } from '../api/NoteApi';
import DateHeader from '../components/DateHeader';
import NoteList from '../components/NoteList';
import { TextInput, View } from '../components/Themed';
import { getBackgroundColor } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { setDate } from '../redux/actions/DateActions';
import { addNote, fetchNotes, removeNote, updateNote } from '../redux/actions/NotesActions';

export type LogScreenProps = {
  route: {
    params?: {
      type?: string;
      brainDump?: boolean;
    };
  };
};

const selectNotes = (state: any) => {
  return state.notes;
};
const selectDate = (state: any) => {
  return state.date;
};

function dateFromObjectId(objectId?: string) {
  if (!objectId) {
    return null;
  }
  return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
}

export default function LogScreen({ route }: LogScreenProps) {
  const textInputRef = React.useRef<any>();

  const notes = useSelector(selectNotes);
  const date = useSelector(selectDate);
  const dispatch = useDispatch();
  const [body, setBody] = React.useState("");
  const theme = useColorScheme();
  const [dumpStartDate, setDumpStartDate] = React.useState(
    route.params?.brainDump ? new Date() : null
  );

  const [selectedNoteId, setSelectedNoteId] = React.useState("");
  const [isBottomSheetVisible, setBottomSheetVisible] = React.useState(false);

  const handleNoteSelected = React.useCallback((note: Note) => {
    setSelectedNoteId(note._id as string);
    setBottomSheetVisible(true);
  }, []);

  const handleToggleIcon = React.useCallback((note: Note) => {
    let types = [type];
    if (type === "task") {
      types = ["task", "task_completed"];
    } else if (!type) {
      types = ["note", "task", "task_completed", "event"];
    }

    const currentTypeIndex = types.findIndex((type) => {
      return type === (note.type || "note");
    });
    const newTypeIndex = (currentTypeIndex + 1) % types.length;
    const newType = types[newTypeIndex];
    updateNote(dispatch, { _id: note._id, type: newType });
  }, []);

  const handleDateChanged = React.useCallback((date: Date) => {
    _setDate(date);
  }, []);

  const bottomSheetOptions = [
    {
      title: "Edit",
      onPress: () => {
        handleEdit();
      },
    },
    {
      title: "Delete",
      onPress: () => {
        handleRemove();
      },
    },
    {
      title: "Cancel",
      onPress: () => {
        setSelectedNoteId("");
        setBottomSheetVisible(false);
      },
    },
  ];

  const isBrainDump = route.params?.brainDump;

  const type = route.params?.type;

  let placeholder = "What's on your mind?";
  if (type === "task") {
    placeholder = "What do you need to do today?";
  } else if (type === "event") {
    placeholder = "What's happening today?";
  }

  let allowedTypes = ["note", "task", "task_completed", "event"];
  if (type) {
    if (type === "task") {
      allowedTypes = ["task", "task_completed"];
    } else {
      allowedTypes = [type];
    }
  }

  const filteredNotes = React.useMemo(() => {
    const filteredNotes = notes.filter((note: Note) => {
      if (note.date !== moment(date).format("YYYY-MM-DD")) {
        return false;
      }
      if (allowedTypes.includes(note.type) === false) {
        return false;
      }
      if (
        dumpStartDate &&
        moment(dumpStartDate).isAfter(dateFromObjectId(note._id))
      ) {
        return false;
      }
      return true;
    });

    if (type === "task") {
      filteredNotes.sort((note1: Note, note2: Note) => {
        return note1.type < note2.type;
      });
    }
    return filteredNotes.reverse();
  }, [notes]);

  async function refetchNotes() {
    fetchNotes(dispatch, { date: moment(date).format("YYYY-MM-DD") }).catch(
      handleGenericError
    );
  }

  async function handleSubmit() {
    if (!body) {
      return;
    }

    let dateString = moment(date).format("YYYY-MM-DD");
    const oldBody = body;
    try {
      setBody("");

      if (selectedNoteId) {
        const currentSelectedNoteId = selectedNoteId;
        setSelectedNoteId("");
        await updateNote(dispatch, {
          _id: currentSelectedNoteId,
          body,
        });
      } else {
        await addNote(dispatch, {
          body,
          type: type || "note",
          date: dateString,
        });
      }
    } catch (err) {
      setBody(oldBody);

      handleGenericError(err);
    }
  }

  function handleGenericError(err: Error) {
    Alert.alert("Error", err.message);
  }

  async function handleRemove() {
    setBottomSheetVisible(false);

    removeNote(dispatch, { _id: selectedNoteId });

    setSelectedNoteId("");
  }

  function handleEdit(noteToEdit?: Note) {
    setBottomSheetVisible(false);

    const note =
      noteToEdit ||
      filteredNotes.find((n: Note) => {
        return n._id === selectedNoteId;
      });
    if (note) {
      setBody(note.body);
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
    list: {
      flexGrow: 1,
      width: "100%",
      maxWidth: 800,
      margin: "auto",
    },
    listItem: {
      backgroundColor: getBackgroundColor(theme),
    },
    listItemContent: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    listItemTitle: {
      marginTop: 8,
      marginHorizontal: 8,
    },
    listItemSeparator: {
      height: 1,
      width: "100%",
      backgroundColor: theme === "light" ? "#EEE" : "#424242",
    },
    input: {
      flexGrow: 1,
      borderBottomWidth: 1,
      borderBottomColor: "#3f51b5",
      padding: 8,
    },
    textBoxWrapper: {
      alignItems: "center",
      width: "100%",
      padding: 16,
    },
    textBox: {
      width: "100%",
      maxWidth: 800,
      flexDirection: "row",
    },
  });

  const handleTodayPressed = React.useCallback(() => {
    _setDate(new Date());
  }, []);

  function _setDate(date: Date) {
    setDate(dispatch, date);
  }

  const handleRefreshPressed = React.useCallback(() => {
    refetchNotes();
  }, []);

  function handleQuickEdit(note: Note) {
    textInputRef.current?.focus();
    setSelectedNoteId(note._id as string);
    handleEdit(note);
  }

  function handleTextInputBlur() {
    if (selectedNoteId) {
      setSelectedNoteId("");
      setBody("");
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={isBrainDump ? 0 : 85}
      style={styles.container}
    >
      <View style={styles.content}>
        {route.params?.brainDump ? null : (
          <DateHeader
            date={date}
            onChange={handleDateChanged}
            onToday={handleTodayPressed}
            onRefresh={handleRefreshPressed}
          />
        )}
        <NoteList
          selectedNoteId={selectedNoteId}
          notes={filteredNotes}
          onNotePress={handleQuickEdit}
          onNoteLongPress={handleNoteSelected}
          onToggleNoteIcon={handleToggleIcon}
        />
      </View>
      <View style={styles.textBoxWrapper}>
        <View style={styles.textBox}>
          <TextInput
            textInputRef={textInputRef}
            autoFocus={isBrainDump}
            blurOnSubmit={!body}
            style={styles.input}
            onSubmitEditing={handleSubmit}
            onBlur={handleTextInputBlur}
            onChangeText={setBody}
            value={body}
            returnKeyType={"done"}
            placeholder={placeholder}
          />
        </View>
      </View>
      <BottomSheet
        isVisible={isBottomSheetVisible}
        modalProps={{
          animationType: "none",
        }}
      >
        {bottomSheetOptions.map((l, i) => (
          <ListItem key={i} onPress={l.onPress}>
            <ListItem.Content>
              <ListItem.Title>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </KeyboardAvoidingView>
  );
}
