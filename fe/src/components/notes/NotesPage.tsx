import React, {
  createRef,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import "./NotesPage.css";
import TextBox from "../textbox/TextBox";

type Note = {
  _id?: string;
  body: string;
};

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
      axios.get("/api/notes").then((res) => {
        setState("loaded");
        setNotes(res.data);
      });
    }
  }, [state]);

  const handleSubmit = async (note: string) => {
    const newNote = { body: note };
    setNotes([...notes, newNote]);

    await axios.post("/api/notes", newNote);
  };

  return (
    <div className="App">
      <div id="notes" ref={notesRef}>
        {notes.map((note, index) => {
          return (
            <div key={index} className="note">
              <span className="note-body">{note.body}</span>
            </div>
          );
        })}
      </div>
      <TextBox onSubmit={handleSubmit}/>
    </div>
  );
}