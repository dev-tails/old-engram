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
  GetNotesParams,
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
  const [date, setDate] = useState<Date>(moment().startOf("day").toDate());
  const [notes, setNotes] = useState<Note[]>([]);
  const [bottomNavIndex, setBottomNavIndex] = React.useState(0);

  console.log(date);

  let title = "Archive";
  if (props.daily) {
    title = date.toLocaleDateString();
  }

  useEffect(() => {
    const getNotesParams: GetNotesParams = {};
    if (props.daily) {
      getNotesParams.since_id = objectIdFromDate(date);
      getNotesParams.max_id = objectIdFromDate(
        moment(date).endOf("day").toDate()
      );
    }

    getNotes(getNotesParams).then((notes) => {
      setNotes(notes);
    });
  }, [date, props.daily]);

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

  const handleArrowClicked = (direction: string) => {
    console.log(direction);
    if (direction === "left") {
      setDate(moment(date).subtract(1, "d").toDate());
    } else {
      setDate(moment(date).add(1, "d").toDate());
    }
  };

  return (
    <div className="notes-page">
      <Header title={title} showArrows onArrowClicked={handleArrowClicked} />
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
