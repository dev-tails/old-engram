import moment from "moment";

import * as Api from "../../Api";
import * as db from "../../db/db";
import { isObjectId } from "../../utils/ObjectId";

export type NoteType =
  | "note"
  | "task"
  | "task_completed"
  | "event"
  | "workspace";

export type Note = {
  _id?: string;
  localId?: string;
  date?: string;
  body?: string;
  checked?: boolean;
  archived?: boolean;
  type?: NoteType;
  start?: Date;
  parent?: string;
  prev?: string;
};

export async function createOrUpdateNote(note: Partial<Note>) {
  if (isObjectId(note._id)) {
    return updateNote(note);
  }
  return createNote(note);
}

export async function createNote(note: Partial<Note>) {
  let noteToCreate = { ...note, localId: db.getId() };
  await db.addNote(noteToCreate);

  // const res = await axios.post(
  //   "/api/notes",
  //   { ...note },
  //   { withCredentials: true }
  // );

  // const newNote = res.data;

  if (notes) {
    notes.push(noteToCreate);
  }

  return noteToCreate;
}

export async function getNote(params: { id: string }): Promise<Note[]> {
  const res = await Api.get(`/api/notes/${params.id}`, {
    withCredentials: true,
  });
  return res.data;
}

let notesPromise: Promise<any[]> | null = null;
let notes: Note[] | null = null;
export async function getAllNotes(): Promise<any[]> {
  if (!notesPromise) {
    // notesPromise = Api.get(`/api/notes`);
    notesPromise = db.getAllNotes();
  }
  return notesPromise;
  // const res = await notesPromise;

  // if (!notes) {
  //   notes = res.data;
  // }

  // return notes;
}

export type GetNotesParams = {
  since_id?: string;
  max_id?: string;
  startsBefore?: Date;
  startsAfter?: Date;
  since?: Date;
  before?: Date;
  type?: NoteType;
  tag?: string | null;
  search?: string | null;
  sort?: string;
  parent?: string | null | undefined;
};

export async function getNotes(params: GetNotesParams = {}): Promise<Note[]> {
  const notes = await getAllNotes();

  let searchRegex: RegExp | null = null;
  if (params.search) {
    searchRegex = new RegExp(params.search, "i");
  }
  const notesToReturn = notes.filter((note) => {
    let id = note._id as string;

    if (params.since_id && id < params.since_id) {
      return false;
    }
    if (params.max_id && id > params.max_id) {
      return false;
    }
    if (params.type && note.type !== params.type) {
      if (params.type === "task" && note.type === "task_completed") {
      } else {
        return false;
      }
    }
    if (
      params.since &&
      (!note.date || moment(note.date).isBefore(params.since))
    ) {
      return false;
    }
    if (
      params.before &&
      (!note.date || moment(note.date).isAfter(params.before))
    ) {
      return false;
    }
    if (
      params.startsAfter &&
      (!note.start || moment(note.start).isBefore(params.startsAfter))
    ) {
      return false;
    }
    if (
      params.startsBefore &&
      (!note.start || moment(note.start).isAfter(params.startsBefore))
    ) {
      return false;
    }
    if (params.tag && !note.body.includes(`[[${params.tag}]]`)) {
      return false;
    }
    if (searchRegex && !searchRegex.test(note.body)) {
      return false;
    }
    if (params.parent && note.parent !== params.parent) {
      return false;
    }
    return true;
  });

  return notesToReturn;
}

export async function updateNote(note: Partial<Note>): Promise<Note> {
  await db.putNote(note);

  // const res = await axios.put(`/api/notes/${note._id}`, note, {
  //   withCredentials: true,
  // });

  // const updatedNote = res.data;

  let updatedNote = note;

  if (notes) {
    const noteToUpdateIndex = notes.findIndex(
      (n) => n.localId === note.localId
    );
    if (noteToUpdateIndex > -1) {
      updatedNote = { ...notes[noteToUpdateIndex], ...note };
      notes.splice(noteToUpdateIndex, 1, updatedNote);
    }
  }

  return updatedNote;
}

export async function removeNote(noteId?: string | null | undefined) {
  if (!noteId) {
    return;
  }

  await db.deleteNote(noteId);

  // await axios.delete(`/api/notes/${noteId}`);

  if (notes) {
    const noteToRemoveIndex = notes.findIndex((note) => note._id === noteId);
    if (noteToRemoveIndex > -1) {
      notes.splice(noteToRemoveIndex, 1);
    }
  }
}
