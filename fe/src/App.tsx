import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";
import axios from "axios";
import "./App.css";

function App() {
  const date = new Date();
  const [body, setBody] = useState("");

  const handleSaveClicked = () => {
    axios.post("", { body });
  };

  const handleBodyChanged = (event: FormEvent<HTMLElement>) => {
    setBody(event.currentTarget.innerText);
  };

  return (
    <div className="App">
      <div id="date">{date.toLocaleDateString()}</div>
      <div id="body" contentEditable="true" onInput={handleBodyChanged}></div>
      <div id="save" onClick={handleSaveClicked}>
        Save
      </div>
    </div>
  );
}

export default App;
