import React, { useEffect, useState } from "react";
import "./NotesPage.scss";
import TextBox from "../textbox/TextBox";
import { Note, getNotes, removeNote, updateNote, createNote } from "./NotesApi";
import { Header } from "../header/Header";
import { ListWidget, ListWidgetProps } from "../widgets/ListWidget/ListWidget";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [state, setState] = useState("initial");

  useEffect(() => {
    setState("loading");

    if (state === "initial") {
      getNotes().then((notes) => {
        setState("loaded");
        setNotes(notes);
      });
    }
  }, [state]);

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
      <Header title={"Notes"} />
      <ListWidget
        items={notes}
        onItemChanged={handleItemChanged}
        onItemDeleted={handleItemDeleted}
      />
      <TextBox onSubmit={handleSubmit} />
    </div>
  );
}
