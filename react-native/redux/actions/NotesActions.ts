import uuid from 'react-native-uuid';
import { Dispatch } from 'redux';

import * as NoteApi from '../../api/NoteApi';

export type RemoveNoteAction = {
  type: "REMOVE_NOTE";
  payload: string;
};

export type AddNoteAction = {
  type: "ADD_NOTE";
  payload: NoteApi.Note;
};

export type UpdateNoteAction = {
  type: "UPDATE_NOTE";
  payload: NoteApi.Note;
};

export type FetchNotesAction = {
  type: "FETCH_NOTES";
  payload: NoteApi.Note[];
};

export async function fetchNotes(
  dispatch: Dispatch,
  params: NoteApi.GetNotesParams
) {
  const notes = await NoteApi.getNotes(params);
  dispatch({ type: "FETCH_NOTES", payload: notes });
}

export async function addNote(dispatch: Dispatch, note: Partial<NoteApi.Note>) {
  const noteToCreate = {
    ...note,
    localId: uuid.v4() as string,
  };
  dispatch({ type: "ADD_NOTE", payload: noteToCreate });
  const savedNote = await NoteApi.createNote(noteToCreate);
  dispatch({ type: "UPDATE_NOTE", payload: savedNote });
}

export async function updateNote(
  dispatch: Dispatch,
  note: Partial<NoteApi.Note>
) {
  const savedNote = await NoteApi.updateNote(note);
  dispatch({ type: "UPDATE_NOTE", payload: savedNote });
}

export async function removeNote(dispatch: Dispatch, id: string) {
  await NoteApi.removeNote(id);
  dispatch({ type: "REMOVE_NOTE", payload: id });
}
