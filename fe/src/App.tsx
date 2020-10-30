import React, {
  createRef,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import "./App.css";

type Note = {
  _id?: string;
  body: string;
}

function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [state, setState] = useState("initial");

  const notesRef = createRef<HTMLDivElement>();
  const inputRef = createRef<HTMLInputElement>();

  useEffect(() => {
    if (!notesRef.current) {
      return;
    }
    window.scrollTo({top: notesRef.current.scrollHeight});
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

  const handleSaveClicked: ReactEventHandler = async (event) => {
    event?.preventDefault()
    
    if(inputRef.current) {
      inputRef.current.focus();
    }
    const res = await axios.post("/api/notes", { body: note});
    const newNote = res.data;
    setNotes([
      ...notes,
      newNote
    ]);
    setNote("");
  };

  const handleNoteChanged = (event: any) => {
    setNote(event?.target?.value);
  }

  return (
    <div className="App">
      <div id="notes" ref={notesRef}>
        {notes.map((note) => {
          return (
            <div key={note._id} className="note">
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
