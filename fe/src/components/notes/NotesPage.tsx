import React, { useEffect, useState } from "react";
import "./NotesPage.scss";
import TextBox from "../textbox/TextBox";
import {
  Note,
  NoteType,
  getNotes,
  removeNote,
  updateNote,
  createNote,
} from "./NotesApi";
import { Header } from "../header/Header";
import { ListWidget, ListWidgetProps } from "../widgets/ListWidget/ListWidget";
import moment from "moment";
import { objectIdFromDate } from "../../utils/ObjectId";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import {
  FiberManualRecord,
  RadioButtonUnchecked,
  CheckBoxOutlineBlank,
} from "@material-ui/icons";

export type NotesPageProps = {
  daily?: boolean;
};

const bottomNavIndexToNoteType: NoteType[] = ["note", "task", "event"];

export default function NotesPage(props: NotesPageProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [bottomNavIndex, setBottomNavIndex] = React.useState(0);

  let title = "Archive";
  if (props.daily) {
    title = new Date().toLocaleDateString();
  }

  useEffect(() => {
    let since_id = "";
    if (props.daily) {
      since_id = objectIdFromDate(moment().startOf("day").toDate());
    }

    getNotes({ since_id }).then((notes) => {
      setNotes(notes);
    });
  }, [props.daily]);

  const handleSubmit = async (note: string) => {
    const noteType = bottomNavIndexToNoteType[bottomNavIndex];
    const newNote = await createNote({ body: note, type: noteType });
    setNotes([newNote, ...notes]);
  };

  const handleItemChanged: ListWidgetProps["onItemChanged"] = (item, index) => {
    updateNote(item);

    const notesCopy = Array.from(notes);
    const oldNote = notes[index];
    let newNote: Note = {
      ...oldNote,
      ...item,
    };
    let itemsToReinsert = [newNote];
    if (props.daily && item.archived) {
      itemsToReinsert = [];
    }

    notesCopy.splice(index, 1, ...itemsToReinsert);
    setNotes(notesCopy);
  };

  const handleItemDeleted = (itemId?: string) => {
    removeNote(itemId);
    const notesCopy = Array.from(notes);
    const index = notesCopy.findIndex((item) => item._id === itemId);
    notesCopy.splice(index, 1);
    setNotes(notesCopy);
  };

  return (
    <div className="notes-page">
      <Header title={title} />
      <ListWidget
        items={notes}
        onItemChanged={handleItemChanged}
        onItemDeleted={handleItemDeleted}
        actions={props.daily ? ["archive"] : ["delete"]}
        showArchived={props.daily ? false : true}
      />
      <TextBox onSubmit={handleSubmit} />
      <BottomNavigation
        value={bottomNavIndex}
        onChange={(event, newValue) => setBottomNavIndex(newValue)}
        showLabels
      >
        <BottomNavigationAction label="Note" icon={<FiberManualRecord />} />
        <BottomNavigationAction label="Task" icon={<CheckBoxOutlineBlank />} />
        <BottomNavigationAction label="Event" icon={<RadioButtonUnchecked />} />
      </BottomNavigation>
    </div>
  );
}
