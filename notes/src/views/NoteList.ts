import { Div } from "../../../ui/components/Div";
import { NoteType } from "../types/NoteType";
import { Note } from "./Note";

export type NoteListProps = {
  notes: NoteType[];
};

export function NoteList(props: NoteListProps) {
  const el = Div();

  for (const note of props.notes) {
    el.appendChild(Note({ note }));
  }

  return el;
}
