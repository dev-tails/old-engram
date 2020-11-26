import React, { useRef, useState } from "react";
import "./TextBox.scss";

type TextBoxProps = {
  onSubmit: (body: string) => void;
};

export default function TextBox(props: TextBoxProps) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [
    submitPhraseTimeoutId,
    setSubmitPhraseTimeoutId,
  ] = useState<NodeJS.Timeout | null>(null);
  const [virtualMode, setVirtualMode] = useState(false);
  const [note, setNote] = useState("");

  const handleNoteChanged: React.TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"] = (
    event
  ) => {
    let newNote = event?.target?.value;

    if (submitPhraseTimeoutId) {
      clearTimeout(submitPhraseTimeoutId);
      setSubmitPhraseTimeoutId(null);
    }

    const submitPhrases = ["engram", "end gram", "and graham"];
    for (const submitPhrase of submitPhrases) {
      const endSubstringToCheck = newNote.substr(
        newNote.length - submitPhrase.length
      );
      const submitPhraseDetected = endSubstringToCheck
        .toLowerCase()
        .includes(submitPhrase);
      if (submitPhraseDetected) {
        setVirtualMode(true);

        const bodyWithoutSubmitPhrase = newNote
          .substr(0, newNote.length - submitPhrase.length)
          .trimRight();

        const submitFunc = handleSubmit.bind(null, bodyWithoutSubmitPhrase);

        const submitPhraseDelayMilliseconds = 1000;
        setSubmitPhraseTimeoutId(
          setTimeout(submitFunc, submitPhraseDelayMilliseconds)
        );
      }
    }

    setNote(newNote);
  };

  const handleKeyDown: React.DOMAttributes<HTMLTextAreaElement>["onKeyDown"] = (
    event
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(note);
    }
  };

  const handleSubmit = (body: string) => {
    props.onSubmit(body);
    setNote("");

    if (virtualMode) {
      setVirtualMode(false);
      if (textAreaRef.current) {
        textAreaRef.current.blur();
      }
    }
  };

  return (
    <div className="textbox">
      <textarea
        autoFocus={true}
        value={note}
        onKeyDown={handleKeyDown}
        onChange={handleNoteChanged}
        rows={1}
        ref={textAreaRef}
      />
    </div>
  );
}
