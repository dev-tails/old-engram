import { Dispatch } from 'redux';

import * as NoteApi from '../../components/notes/NotesApi';

export type SetNoteAction = {
  type: "SET_NOTE";
  payload: NoteApi.Note;
};

export async function setNote(dispatch: Dispatch, note: Partial<NoteApi.Note>) {
  dispatch({ type: "SET_NOTE", payload: note });
}

export type SetNoteBodyAction = {
  type: "SET_NOTE_BODY";
  payload: string;
};

export async function setNoteBody(dispatch: Dispatch, body: string) {
  dispatch({ type: "SET_NOTE_BODY", payload: body });
}

export type SetNoteTypeAction = {
  type: "SET_NOTE_TYPE";
  payload: string;
};

export async function setNoteType(dispatch: Dispatch, type: string) {
  dispatch({ type: "SET_NOTE_TYPE", payload: type });
}
