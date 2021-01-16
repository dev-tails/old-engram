import axios, { AxiosResponse } from 'axios';
import moment from "moment";

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

let notesPromise: Promise<AxiosResponse<Note[]>> | null = null;
export async function getAllNotes(): Promise<Note[]>  {
  if (!notesPromise) {
    notesPromise = Api.get(`/api/notes`);
  }
  const res = await notesPromise;
  return res.data;
}

export type GetNotesParams = {
  since_id?: string;
  max_id?: string;
  since?: Date;
  before?: Date;
  type?: NoteType;
  tag?: string | null;
  search?: string | null;
  sort?: string;
};

export async function getNotes(params: GetNotesParams = {}): Promise<Note[]> {
  const notes = await getAllNotes();

  const notesToReturn = notes.filter((note) => {
    let id = note._id as string;

    if(params.since_id && id < params.since_id) {
      return false;
    }
    if(params.max_id && id > params.max_id) {
      return false;
    }
    if (params.type && note.type !== params.type) {
      return false;
    }
    if (params.since && (moment(note.start).isBefore(params.since))) {
      return false;
    }
    if (params.before && (moment(note.start).isAfter(params.before))) {
      return false;
    }
    if(params.tag && !note.body.includes(`[[${params.tag}]]`)) {
      return false
    }
    if(params.search && !note.body.toLowerCase().includes(`${params.search}`)) {
      return false
    }
    return true;
  });

  return notesToReturn;
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
