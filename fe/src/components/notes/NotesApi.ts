import axios from 'axios';
import queryString from 'query-string';

import * as Api from '../../Api';

export type NoteType = "note" | "task" | "task_completed" | "event";

export type Note = {
  _id?: string;
  body: string;
  checked?: boolean;
  archived?: boolean;
  type?: NoteType;
  start?: Date;
  parent?: string;
  prev?: string;
};

export async function createOrUpdateNote(note: Partial<Note>) {
  if (note._id) {
    return updateNote(note);
  }
  return createNote(note);
}

export async function createNote(note: Partial<Note>) {
  const res = await axios.post(
    "/api/notes",
    { ...note },
    { withCredentials: true }
  );
  return res.data;
}

export async function getNote(params: { id: string }): Promise<Note[]> {
  const res = await Api.get(`/api/notes/${params.id}`, {
    withCredentials: true,
  });
  return res.data;
}

export type GetNotesParams = {
  since_id?: string;
  max_id?: string;
  since?: string;
  before?: string;
  type?: NoteType;
};

export async function getNotes(params: GetNotesParams): Promise<Note[]> {
  const res = await Api.get(`/api/notes?${queryString.stringify(params)}`, {
    withCredentials: true,
  });
  return res.data;
}

export async function updateNote(note: Partial<Note>): Promise<Note> {
  const res = await axios.put(`/api/notes/${note._id}`, note, {
    withCredentials: true,
  });
  return res.data;
}

export async function removeNote(noteId?: string) {
  if (!noteId) {
    return;
  }
  await axios.delete(`/api/notes/${noteId}`);
}
