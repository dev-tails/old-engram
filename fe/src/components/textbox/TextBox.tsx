import React, { useState } from "react";

type TextBoxProps = {
  onSubmit: (body: string) => void;
};

export default function TextBox(props: TextBoxProps) {
  const [note, setNote] = useState("");

  const handleNoteChanged = (event: any) => {
    setNote(event?.target?.value);
  };

  const handleKeyDown: React.DOMAttributes<HTMLTextAreaElement>["onKeyDown"] = (
    event
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      props.onSubmit(note);
      setNote("");
    }
  };

  return (
    <div id="textbox">
      <textarea
        autoFocus={true}
        value={note}
        onKeyDown={handleKeyDown}
        onChange={handleNoteChanged}
        rows={1}
      />
    </div>
  );
}
