import React, {
  createRef,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";

type TextBoxProps = {
  hidden?: boolean;
  onSubmit: (body: string) => void;
};

export default function TextBox(props: TextBoxProps) {
  const [note, setNote] = useState("");

  const handleSaveClicked: ReactEventHandler = (event) => {
    event?.preventDefault();
    props.onSubmit(note);
    setNote("");
  };

  const handleNoteChanged = (event: any) => {
    setNote(event?.target?.value);
  };

  let inputType = "text";
  if (props.hidden) {
    inputType = "password";
  }

  return (
    <div id="textbox">
      <form onSubmit={handleSaveClicked}>
        <input autoFocus={true} type={inputType} value={note} onChange={handleNoteChanged} />
        <button type="submit" hidden={true}></button>
      </form>
    </div>
  );
}
