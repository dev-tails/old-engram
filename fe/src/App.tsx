import React, {
  createRef,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import "./App.css";

type Note = {
  body: string;
}

function App() {
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
  }, [state]);

  const handleSaveClicked: ReactEventHandler = (event) => {
    event?.preventDefault()

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
      <div id="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              {note.body}
            </div>
          )
        })}
      </div>
      <div id="textbox">
        <form onSubmit={handleSaveClicked}>
          <input ref={inputRef} autoFocus={true} value={note} onChange={handleNoteChanged}/>
          <button type="submit">
            <span role="img" aria-label="brain">🧠</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
