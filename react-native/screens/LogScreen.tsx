import moment from "moment";
import * as React from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { BottomSheet, ListItem } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Image } from "react-native-elements/dist/image/Image";
import { useDispatch, useSelector } from "react-redux";

import { Note } from "../api/NoteApi";
import DateHeader from "../components/DateHeader";
import { ListItemTitle, TextInput, View } from "../components/Themed";
import { getBackgroundColor, getTextColor } from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { setDate } from "../redux/actions/DateActions";
import {
  addNote,
  fetchNotes,
  removeNote,
  updateNote,
} from "../redux/actions/NotesActions";

const Logo = require("../assets/images/adaptive-icon.png");

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
  const notes = useSelector(selectNotes);
  const date = useSelector(selectDate);
  const dispatch = useDispatch();
  const listRef = React.useRef<FlatList | null>(null);
  const [body, setBody] = React.useState("");
  const theme = useColorScheme();
  const [dumpStartDate, setDumpStartDate] = React.useState(
    route.params?.brainDump ? new Date() : null
  );

  const [selectedNoteId, setSelectedNoteId] = React.useState("");
  const [isBottomSheetVisible, setBottomSheetVisible] = React.useState(false);

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
      return note1.type > note2.type;
    });
  }

  async function refetchNotes() {
    fetchNotes(dispatch).catch(handleGenericError);
  }

  async function handleSubmit() {
    let dateString = moment(date).format("YYYY-MM-DD");
    let noteToSave: Note = { body, type: type || "note", date: dateString };
    try {
      if (selectedNoteId) {
        await updateNote(dispatch, { _id: selectedNoteId, ...noteToSave });
      } else {
        await addNote(dispatch, noteToSave);
      }

      setBody("");

      scrollToBottomOfNotes();
    } catch (err) {
      handleGenericError(err);
    }
  }

  function handleDateChanged(date: Date) {
    _setDate(date);
  }

  function handleGenericError(err: Error) {
    Alert.alert("Error", err.message);
  }

  async function handleRemove() {
    setBottomSheetVisible(false);

    removeNote(dispatch, selectedNoteId);

    setSelectedNoteId("");
  }

  function handleEdit() {
    setBottomSheetVisible(false);
    const note = filteredNotes.find((n: Note) => {
      return n._id === selectedNoteId;
    });
    if (note) {
      setBody(note.body);
    }
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
      backgroundColor: getBackgroundColor(theme),
    },
    listItemContent: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    listItemTitle: {
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

  function handleTodayPressed() {
    _setDate(new Date());
  }

  function _setDate(date: Date) {
    setDate(dispatch, date);
  }

  function handleRefreshPressed() {
    refetchNotes();
  }

  function getIconNameForType(type: string): string {
    const typeToIconMap: { [key: string]: string } = {
      note: "remove",
      task: "check-box-outline-blank",
      task_completed: "check-box",
      event: "radio-button-unchecked",
    };
    return typeToIconMap[type];
  }

  function handleToggleIcon(note: Note) {
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
  }

  function scrollToBottomOfNotes() {
    setTimeout(() => {
      listRef.current?.scrollToEnd();
    }, 50);
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
        <Image width={24} height={24} source={Logo} />
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
          renderItem={({ item }) => {
            const additionalTitleStyles: any = {};

            const disabledColor = "#424242";

            if (item.type === "task_completed") {
              additionalTitleStyles.color = disabledColor;
            }

            return (
              <ListItem
                containerStyle={styles.listItem}
                underlayColor={"#424242"}
                onPress={() => {
                  setSelectedNoteId(item._id);
                  setBottomSheetVisible(true);
                }}
              >
                <ListItem.Content style={styles.listItemContent}>
                  <Icon
                    name={getIconNameForType(item.type)}
                    color={
                      item.type === "task_completed"
                        ? disabledColor
                        : getTextColor(theme)
                    }
                    onPress={() => {
                      handleToggleIcon(item);
                    }}
                  />
                  <ListItemTitle
                    style={{
                      ...styles.listItemTitle,
                      ...additionalTitleStyles,
                    }}
                  >
                    {item.body}
                  </ListItemTitle>
                </ListItem.Content>
                {/* <ListItem.Chevron /> */}
              </ListItem>
            );
          }}
        />
      </View>
      <View style={styles.textBoxWrapper}>
        <View style={styles.textBox}>
          <TextInput
            onFocus={scrollToBottomOfNotes}
            autoFocus={isBrainDump}
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
      <BottomSheet
        isVisible={isBottomSheetVisible}
        containerStyle={{}}
        modalProps={{}}
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
