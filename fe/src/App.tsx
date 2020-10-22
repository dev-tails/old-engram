import React, {
  ChangeEvent,
  createRef,
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import "./App.css";

type Note = {
  body: string;
}

function App() {
  const date = new Date();
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [state, setState] = useState("initial");

  const inputRef = createRef<HTMLInputElement>();

  useEffect(() => {
    setState("loading");

    if (state === "initial") {
      axios.get("/api/notes").then((res) => {
        setState("loaded");
        setNotes(res.data);
      });
    }
  });

  const handleSaveClicked = () => {
    const newNote: Note = {
      body: note
    }
    setNotes([
      ...notes,
      newNote
    ]);
    setNote("");
    if(inputRef.current) {
      inputRef.current.focus();
    }
    axios.post("/api/notes", newNote);
  };

  const handleNoteChanged = (event: any) => {
    setNote(event?.target?.value);
  }

  return (
    <div className="App">
      <div id="date">{date.toLocaleDateString()}</div>
      <div id="notes">
        {notes.map((note) => {
          return (
            <div>
              {note.body}
            </div>
          )
        })}
      </div>
      <div id="textbox">
        <input ref={inputRef} autoFocus={true} value={note} onChange={handleNoteChanged}/>
        <div id="submit" onClick={handleSaveClicked}>
          🧠
        </div>
      </div>
    </div>
  );
}

export default App;
