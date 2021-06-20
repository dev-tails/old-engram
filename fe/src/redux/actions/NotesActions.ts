import { Dispatch } from 'redux';

import * as NoteApi from '../../components/notes/NotesApi';

export type RemoveNoteAction = {
  type: "REMOVE_NOTE";
  payload: NoteApi.Note;
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

export async function fetchNotesForDate(dispatch: Dispatch, date: Date) {
  const notes = await NoteApi.getNotesForDate(date);
  dispatch({ type: "FETCH_NOTES", payload: notes });
}

export async function addNote(dispatch: Dispatch, note: Partial<NoteApi.Note>) {
  const noteToCreate = {
    ...note,
  };
  try {
    dispatch({ type: "ADD_NOTE", payload: noteToCreate });
    const savedNote = await NoteApi.createNote(noteToCreate);
    dispatch({ type: "UPDATE_NOTE", payload: savedNote });
  } catch (err) {
    removeNote(dispatch, noteToCreate);
    throw err;
  }
}

export async function updateNote(
  dispatch: Dispatch,
  note: Partial<NoteApi.Note>
) {
  dispatch({ type: "UPDATE_NOTE", payload: note });
  await NoteApi.updateNote(note);
}

export async function removeNote(
  dispatch: Dispatch,
  note: Partial<NoteApi.Note>
) {
  if (note._id) {
    await NoteApi.removeNote(note._id);
  }
  dispatch({ type: "REMOVE_NOTE", payload: note });
}
