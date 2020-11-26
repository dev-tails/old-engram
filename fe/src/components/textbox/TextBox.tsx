import React, { useRef, useState } from "react";
import "./TextBox.scss";

type TextBoxProps = {
  onSubmit: (body: string) => void;
};

function endsWithSubmitPhrase(textToCheck: string): string {
  const submitPhrases = [
    "in the ground",
    "and cram",
    "in grand",
    "an gram",
    "engram",
    "end gram",
    "and graham",
    "in graham",
  ];
  for (const submitPhrase of submitPhrases) {
    const endSubstringToCheck = textToCheck.substr(
      textToCheck.length - submitPhrase.length
    );
    const submitPhraseDetected = endSubstringToCheck
      .toLowerCase()
      .includes(submitPhrase);
    if (submitPhraseDetected) {
      return submitPhrase;
    }
  }
  return "";
}

function debug(msg: string) {
  const debug = false;
  if (debug) {
    console.log(msg);
  }
}

export default function TextBox(props: TextBoxProps) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [
    newLineTimeoutId,
    setNewLinePhraseTimeoutId,
  ] = useState<NodeJS.Timeout | null>(null);
  const [
    submitPhraseTimeoutId,
    setSubmitPhraseTimeoutId,
  ] = useState<NodeJS.Timeout | null>(null);
  const [virtualMode, setVirtualMode] = useState(false);
  const [note, setNote] = useState("");
  const [virtuallySubmittedNotes, setVirtuallySubmittedNotes] = useState<
    string[]
  >([]);

  const handleNoteChanged: React.TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"] = (
    event
  ) => {
    let newNote = event?.target?.value;
    let virtualNote = newNote;

    if (virtualMode) {
      for (const virtuallySubmittedNote of virtuallySubmittedNotes) {
        virtualNote = virtualNote.replace(virtuallySubmittedNote, "");
      }

      debug(`Virtual Note: ${virtualNote}`);
    }

    if (newLineTimeoutId) {
      debug("Cleared new line timeout");

      clearTimeout(newLineTimeoutId);
      setNewLinePhraseTimeoutId(null);
    }

    const submitPhraseDetected = endsWithSubmitPhrase(virtualNote);
    if (submitPhraseDetected) {
      setVirtualMode(true);

      debug(`Adding virtual note: ${virtualNote}`);
      setVirtuallySubmittedNotes([...virtuallySubmittedNotes, virtualNote]);

      const bodyWithoutSubmitPhrase = virtualNote
        .substr(0, virtualNote.length - submitPhraseDetected.length)
        .trimRight();

      const submitPhraseDelayMilliseconds = 200;
      debug("setNewLinePhraseTimeoutId");
      setNewLinePhraseTimeoutId(
        setTimeout(() => {
          handleSubmit(bodyWithoutSubmitPhrase, true);
        }, submitPhraseDelayMilliseconds)
      );
    }

    debug(`Setting note to ${newNote}`);
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

  const handleSubmit = (body: string, virtualMode: boolean = false) => {
    props.onSubmit(body);

    if (virtualMode) {
      debug("submitted virtually");
    } else {
      debug("submitted not virtually");
      setNote("");
    }
  };

  const handleBlur = () => {
    if (virtualMode) {
      setVirtualMode(false);
      setNote("");
    }
  };

  return (
    <div className="textbox">
      <textarea
        autoFocus={true}
        value={note}
        onKeyDown={handleKeyDown}
        onChange={handleNoteChanged}
        onBlur={handleBlur}
        rows={1}
        ref={textAreaRef}
      />
    </div>
  );
}
