import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import "./App.css";

function App() {
  const date = new Date();
  const [state, setState] = useState("initial");
  const bodyDivRef = useRef<any>();

  useEffect(() => {
    setState("loading");

    if (state === "initial") {
      axios.get("/api/notes").then((res) => {
        setState("loaded");
        bodyDivRef.current.innerText = res.data.body;
      });
    }
  });

  const handleSaveClicked = () => {
    axios.post("/api/notes", { body: bodyDivRef.current.innerText });
  };

  return (
    <div className="App">
      <div id="date">{date.toLocaleDateString()}</div>
      <div id="body" ref={bodyDivRef} contentEditable="true"></div>
      <div id="save" onClick={handleSaveClicked}>
        Save
      </div>
    </div>
  );
}

export default App;
