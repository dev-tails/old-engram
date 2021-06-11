import uuid from 'react-native-uuid';
import { Dispatch } from 'redux';

import * as NoteApi from '../../api/NoteApi';

export async function fetchNotes(dispatch: Dispatch) {
  const notes = await NoteApi.getNotes();
  dispatch({ type: "FETCH_NOTES", payload: notes });
}

export async function addNote(dispatch: Dispatch, note: NoteApi.Note) {
  const noteToCreate = {
    ...note,
    localId: uuid.v4(),
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
