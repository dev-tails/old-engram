import React, { createRef, useEffect, useState } from "react";
import axios from "axios";
import "./NotesPage.scss";
import TextBox from "../textbox/TextBox";
import { Note, getNotes } from "./NotesApi";
import { Header } from "../header/Header";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [state, setState] = useState("initial");

  const notesRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!notesRef.current) {
      return;
    }
    notesRef.current.scrollTo({ top: notesRef.current.scrollHeight });
  });

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
    const newNote = { body: note };
    setNotes([...notes, newNote]);

    await axios.post("/api/notes", newNote, { withCredentials: true });
  };

  return (
    <div className="notes-page">
      <Header title={"All"} />
      <div className="notes" ref={notesRef}>
        {notes.map((note, index) => {
          return (
            <div key={index} className="note">
              <span className="note-body">{note.body}</span>
            </div>
          );
        })}
      </div>
      <TextBox onSubmit={handleSubmit} />
    </div>
  );
}
