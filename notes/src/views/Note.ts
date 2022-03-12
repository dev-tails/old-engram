import { Div } from "../../../ui/components/Div";
import { NoteType } from "../types/NoteType"

type NoteProps = {
  note: NoteType;
}

export function Note(props: NoteProps) {
  const el = Div({
    innerText: props.note.body,
    styles: {
      borderBottom: "1px solid black"
    }
  });

  // el.contentEditable = "true";

  return el;
}