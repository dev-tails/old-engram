import { Dispatch } from 'redux';

import { NoteType } from '../../components/notes/NotesApi';

export type SetNoteTypeFilterAction = {
  type: "SET_NOTE_TYPE_FILTER";
  payload: NoteType;
};

export async function setNoteTypeFilter(
  dispatch: Dispatch,
  type: NoteType | null
) {
  dispatch({ type: "SET_NOTE_TYPE_FILTER", payload: type });
}
