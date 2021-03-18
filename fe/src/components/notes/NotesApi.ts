import moment from "moment";

import * as Api from "../../Api";
import * as db from "../../db/db";
import { isObjectId } from "../../utils/ObjectId";
import querystring from "query-string";
import axios from "axios";
import { updateDevice } from "../../DeviceApi";

export type Note = db.Note;
export type NoteType = db.NoteType;

export async function createOrUpdateNote(note: Partial<Note>) {
  if (isObjectId(note._id)) {
    return updateNote(note);
  }
  return createNote(note);
}

export async function createNote(note: Partial<Note>) {
  let noteToCreate = await db.addNote(note);

  axios.post("/api/notes", { ...note }).catch((err) => {});

  if (notes) {
    notes.push(noteToCreate);
  }

  return noteToCreate;
}

export async function getNote(params: { id: string }): Promise<Note[]> {
  if (isObjectId(params.id)) {
    const res = await Api.get(`/api/notes/${params.id}`, {
      withCredentials: true,
    });
    return res.data;
  } else {
    let notes: Note[] = [];
    let parentNote = await db.getNote(params.id);
    if (parentNote) {
      notes.push(parentNote);
    }

    let depth = 1;
    const maxDepth = 10;
    let parentIds = [params.id];
    do {
      let childrenNotes: Note[] = [];
      for (const parentId of parentIds) {
        const childNotes = await db.getNotesByParent(parentId);
        childrenNotes = childrenNotes.concat(childNotes);
      }

      parentIds = childrenNotes.map((childNote) => childNote.localId || "");

      notes = [...notes, ...childrenNotes];
      depth++;
    } while (parentIds.length > 0 && depth < maxDepth);

    return notes;
  }
}

let getAllPromise: Promise<any> | null = null;
let notes: Note[] | null = null;
export async function getAllNotes(): Promise<any[]> {
  const device = await db.getDevice();

  if (!getAllPromise) {
    const offlineNotesPromise = db.getAllNotes();

    const lastSyncDate = device?.syncedAt;
    let qs = "";
    if (lastSyncDate) {
      qs = querystring.stringify({
        lastSyncDate: lastSyncDate.toISOString(),
      });
    }
    const syncDate = new Date();
    const serverNotesPromise = Api.get(`/api/notes?${qs}`)
      .then(async (res) => {
        if (device) {
          const newServerNotes = res.data;
          for (const note of newServerNotes) {
            await db.insertOrUpdateNote(note);
          }

          await updateDevice({ ...device, syncedAt: syncDate });
        }
        return res;
      })
      .catch((err) => {
        // Intentionally ignore errors
        console.error(err);
      });

    getAllPromise = Promise.all([offlineNotesPromise, serverNotesPromise]);
  }

  const [offlineNotes, res] = await getAllPromise;

  if (!notes) {
    notes = [...offlineNotes, ...(res ? res.data : [])];
  }

  return notes;
}

export type GetNotesParams = {
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

  if (note._id) {
    axios.put(`/api/notes/${note._id}`, note).catch(() => {});
  }

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

  const note = await db.getNote(noteId);
  await db.deleteNote(noteId);

  if (note && note._id) {
    axios.delete(`/api/notes/${note._id}`).catch((err) => {});
  }

  if (notes) {
    const noteToRemoveIndex = notes.findIndex((note) => note._id === noteId);
    if (noteToRemoveIndex > -1) {
      notes.splice(noteToRemoveIndex, 1);
    }
  }
}
