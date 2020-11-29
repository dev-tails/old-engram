import React, { useEffect, useState } from "react";
import "./NotesPage.scss";
import TextBox from "../textbox/TextBox";
import { Note, getNotes, removeNote, updateNote, createNote } from "./NotesApi";
import { Header } from "../header/Header";
import { ListWidget, ListWidgetProps } from "../widgets/ListWidget/ListWidget";
import moment from "moment";
import { objectIdFromDate } from "../../utils/ObjectId";

export type NotesPageProps = {
  daily?: boolean;
};

export default function NotesPage(props: NotesPageProps) {
  const [notes, setNotes] = useState<Note[]>([]);

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
    const newNote = await createNote({ body: note });
    setNotes([newNote, ...notes]);
  };

  const handleItemChanged: ListWidgetProps["onItemChanged"] = (item, index) => {
    updateNote(item);

    const notesCopy = Array.from(notes);
    const oldNote = notes[index];
    notesCopy.splice(index, 1, {
      ...oldNote,
      ...item,
    });
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
      <Header title={props.daily ? "Daily" : "All"} />
      <ListWidget
        items={notes}
        onItemChanged={handleItemChanged}
        onItemDeleted={handleItemDeleted}
      />
      <TextBox onSubmit={handleSubmit} />
    </div>
  );
}
