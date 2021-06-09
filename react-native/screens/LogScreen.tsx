import * as React from "react";
import { StyleSheet } from "react-native";

import { Alert, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { ListItem } from "react-native-elements";
import { Note } from "../api/NoteApi";
import {
  View,
  TextInput,
  ListItemTitle,
} from "../components/Themed";
import moment from "moment";
import DateHeader from "../components/DateHeader";
import useColorScheme from "../hooks/useColorScheme";
import { useDispatch, useSelector } from "react-redux";
import { addNote, fetchNotes } from "../redux/actions/NotesActions";
import { setDate } from "../redux/actions/DateActions";

export type LogScreenProps = {
  route: {
    params?: {
      type?: string;
    };
  };
};

const selectNotes = (state: any) => { return state.notes };
const selectDate = (state: any) => { return state.date };


export default function LogScreen({ route }: LogScreenProps) {
  const notes = useSelector(selectNotes);
  const date = useSelector(selectDate);
  const dispatch = useDispatch();
  const listRef = React.useRef<FlatList | null>(null);
  const [body, setBody] = React.useState("");
  const theme = useColorScheme();
  const type = route.params?.type;

  let placeholder = "What's on your mind?"
  if (type === "task") {
    placeholder = "What do you need to do today?"
  } else if (type === "event") {
    placeholder = "What's happening today?";
  }

  let allowedTypes = ["note", "task", "task_completed", "event"];
  if (type) {
    if (type === "task") {
      allowedTypes = ["task", "task_completed"]
    } else {
      allowedTypes = [type]
    }
  }

  const filteredNotes = notes.filter((note: Note) => {
    if (note.date !== moment(date).format("YYYY-MM-DD")) {
      return false
    }
    if (allowedTypes.includes(note.type) === false) {
      return false;
    }
    return true;
    
  });

  async function refetchNotes() {
    fetchNotes(dispatch).catch(handleGenericError)
  }

  async function handleSubmit() {
    let dateString = moment(date).format("YYYY-MM-DD");
    let noteToCreate: Note = { body, type: type || "note", date: dateString };
    try {
      await addNote(dispatch, noteToCreate);

      setBody("");

      setTimeout(() => {
        listRef.current?.scrollToEnd();
      }, 100)
    } catch(err) {
      handleGenericError(err);
    }
  }

  function handleDateChanged(date: Date) {
    _setDate(date);
  }
  
  function handleGenericError(err: Error) {
    Alert.alert("Error", err.message)
  }

  const Separator = () => {
    return <View style={styles.listItemSeparator}></View>;
  };

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
      backgroundColor: "rgba(0,0,0, 0)",
    },
    listItemTitle: {
      color: "white",
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

  function handleTodayPressed() {
    _setDate(new Date());
  }

  function _setDate(date: Date) {
    setDate(dispatch, date);
  }

  function handleRefreshPressed() {
    refetchNotes();
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={85}
      style={styles.container}
    >
      <View style={styles.content}>
        <DateHeader
          date={date}
          onChange={handleDateChanged}
          onToday={handleTodayPressed}
          onRefresh={handleRefreshPressed}
        />
        <FlatList
          ref={listRef}
          keyExtractor={(item, index) => {
            if (item._id) {
              return item._id;
            } else {
              return String(index);
            }
          }}
          style={styles.list}
          data={filteredNotes}
          ItemSeparatorComponent={Separator}
          renderItem={({ item }) => (
            <ListItem containerStyle={styles.listItem}>
              <ListItem.Content>
                <ListItemTitle>{item.body}</ListItemTitle>
              </ListItem.Content>
              {/* <ListItem.Chevron /> */}
            </ListItem>
          )}
        />
      </View>
      <View style={styles.textBoxWrapper}>
        <View style={styles.textBox}>
          <TextInput
            blurOnSubmit={false}
            style={styles.input}
            onSubmitEditing={handleSubmit}
            onChangeText={setBody}
            value={body}
            returnKeyType="done"
            autoCapitalize={"none"}
            placeholder={placeholder}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
