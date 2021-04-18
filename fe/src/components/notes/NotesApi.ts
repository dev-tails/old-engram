import axios from 'axios';
import { orderBy, uniqBy } from 'lodash';
import moment from 'moment';
import querystring from 'query-string';
import { validate as validateUuid } from 'uuid';

import * as Api from '../../Api';
import * as db from '../../db/db';
import { updateDevice } from '../../DeviceApi';
import * as UsersApi from '../../UsersApi';

export type Note = db.Note;
export type NoteType = db.NoteType;

export async function createOrUpdateNote(note: Partial<Note>) {
  if (validateUuid(note.localId || "")) {
    return updateNote(note);
  }
  return createNote(note);
}

export async function createNote(note: Partial<Note>) {
  const date = note.date || moment().format("YYYY-MM-DD");
  let noteToCreate = await db.addNote({ ...note, localId: db.getId(), date });

  await createRemoteNote(noteToCreate);

  if (notes) {
    notes.push(noteToCreate);
  }

  return noteToCreate;
}

export async function createRemoteNote(note: Partial<Note>) {
  const isAuthenticatedUser = await UsersApi.isAuthenticatedUser();
  if (isAuthenticatedUser) {
    axios
      .post("/api/notes", note)
      .then((res) => {
        const addedNote = res.data;
        updateCachedNoteByLocalId(addedNote);
        return db.putNote(addedNote);
      })
      .catch((err) => {});
  }
}

export async function getNote(params: { id: string }): Promise<Note[]> {
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

  const sortedNotes = sortNotes(notes);
  return sortedNotes;
}

let getAllPromise: Promise<any> | null = null;
let notes: Note[] | null = null;
export async function getAllNotes(): Promise<any[]> {
  const device = await db.getDevice();

  if (!getAllPromise) {
    const offlineNotesPromise = db.getAllNotes();
    const promises = [offlineNotesPromise];

    const isAuthenticatedUser = await UsersApi.isAuthenticatedUser();
    if (isAuthenticatedUser) {
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
          const serverNotes: Note[] = [];
          if (device) {
            const newServerNotes = res.data;
            let promises = [];
            const batchSize = 500;
            for (const note of newServerNotes) {
              promises.push(
                db
                  .insertOrUpdateNote({
                    ...note,
                    localId: note.localId || note._id,
                  })
                  .then((noteWithLocalId) => {
                    serverNotes.push(noteWithLocalId);
                  })
              );
              if (promises.length === batchSize) {
                await Promise.all(promises);
                promises = [];
              }
            }
            if (promises.length > 0) {
              await Promise.all(promises);
            }

            await updateDevice({ ...device, syncedAt: syncDate });
          }
          return serverNotes;
        })
        .catch((err) => {
          // Intentionally ignore errors
          console.error(err);
          return [];
        });
      promises.push(serverNotesPromise);
    }

    getAllPromise = Promise.all(promises);
  }

  const [offlineNotes, serverNotes] = await getAllPromise;

  if (!notes) {
    notes = uniqBy(
      [...(serverNotes ? serverNotes : []), ...offlineNotes],
      "localId"
    );
  }

  return notes;
}

export function clearGetAllCache() {
  getAllPromise = null;
  notes = null;
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

  return sortNotes(notesToReturn);
}

export function sortNotes(notes: Note[]) {
  const notesWithoutPrev = [];
  let notesWithPrevOrParent = [];
  for (const note of notes) {
    if (note.prev || note.parent) {
      notesWithPrevOrParent.push(note);
    } else {
      notesWithoutPrev.push(note);
    }
  }

  notesWithPrevOrParent = orderBy(
    notesWithPrevOrParent,
    ["createdAt", "_id"],
    ["desc", "desc"]
  );

  const orderedNotesByCreatedAt = orderBy(
    notesWithoutPrev,
    ["createdAt", "_id"],
    ["asc", "asc"]
  );

  let found = false;
  do {
    found = false;
    for (
      let noteToInsertIndex = 0;
      noteToInsertIndex < notesWithPrevOrParent.length;
      noteToInsertIndex++
    ) {
      const noteToInsert = notesWithPrevOrParent[noteToInsertIndex];

      let indexToInsertTo = -1;
      if (noteToInsert.prev) {
        indexToInsertTo = orderedNotesByCreatedAt.findIndex(
          (note) => note.localId === noteToInsert.prev
        );
      } else if (noteToInsert.parent) {
        indexToInsertTo = orderedNotesByCreatedAt.findIndex(
          (note) => note.localId === noteToInsert.parent
        );
      }

      // If we made it all the way through notesWithPrev, we insert notes with "floating" prevs
      const isLastNote = noteToInsertIndex === notesWithPrevOrParent.length - 1;
      if (indexToInsertTo < 0 && isLastNote) {
        if (orderedNotesByCreatedAt.length) {
          indexToInsertTo = orderedNotesByCreatedAt.length - 1;
        } else {
          indexToInsertTo = 0;
        }
      }

      if (indexToInsertTo < 0) {
        continue;
      }

      notesWithPrevOrParent.splice(noteToInsertIndex, 1);
      orderedNotesByCreatedAt.splice(indexToInsertTo + 1, 0, noteToInsert);
      found = true;
      break;
    }
  } while (found && notesWithPrevOrParent.length > 0);

  return orderedNotesByCreatedAt;
}

export async function updatePartialNote(noteUpdate: Partial<Note>) {
  if (!noteUpdate.localId) {
    throw new Error("localId not specified");
  }

  const existingNote = await db.getNote(noteUpdate.localId);
  return updateNote({
    ...existingNote,
    ...noteUpdate,
  });
}

export async function updateNote(note: Note): Promise<Note> {
  const updatedNote = await db.putNote(note);

  if (await UsersApi.isAuthenticatedUser()) {
    const id = updatedNote._id || updatedNote.localId;
    axios
      .put(`/api/notes/${id}`, updatedNote)
      .then(async (res) => {
        const serverUpdatedNote = res.data;
        updateCachedNoteByLocalId(serverUpdatedNote);
        await db.putNote(serverUpdatedNote);
      })
      .catch(() => {});
  }

  updateCachedNoteByLocalId(updatedNote);

  return updatedNote;
}

function updateCachedNoteByLocalId(updatedNote: Note) {
  if (notes) {
    const noteToUpdateIndex = notes.findIndex(
      (n) => n.localId === updatedNote.localId
    );
    if (noteToUpdateIndex > -1) {
      notes.splice(noteToUpdateIndex, 1, updatedNote);
    }
  }
}

export async function removeNote(noteId?: string | null | undefined) {
  if (!noteId) {
    return;
  }

  const note = await db.getNote(noteId);
  await db.deleteNote(noteId);

  if (note && note._id && (await UsersApi.isAuthenticatedUser())) {
    axios.delete(`/api/notes/${note._id}`).catch((err) => {});
  }

  if (notes) {
    const noteToRemoveIndex = notes.findIndex(
      (note) => note.localId === noteId
    );
    if (noteToRemoveIndex > -1) {
      notes.splice(noteToRemoveIndex, 1);
    }
  }
}

export function indentNote(noteIndex: number, notes: Note[]) {
  const note = notes[noteIndex];
  if (!note) {
    return null;
  }

  let parent = note.parent;

  for (let i = noteIndex - 1; i >= 0; i--) {
    const currentNote = notes[i];
    if (currentNote.parent === parent) {
      parent = currentNote.localId;
      break;
    }
  }

  return {
    ...note,
    parent,
  };
}

export function unindentNote(noteIndex: number, notes: Note[]) {
  const note = notes[noteIndex];
  if (!note) {
    return null;
  }

  let parentId = note.parent; // "1"
  let parent = null;

  for (let i = noteIndex - 1; i >= 0; i--) {
    const currentNote = notes[i];
    if (currentNote.localId === parentId) {
      parent = currentNote;
      break;
    }
  }

  return {
    ...note,
    parent: parent?.parent,
  };
}

export function getUpdatesToPositionNote(
  noteToPosition: Note,
  newPrev: Note,
  sortedNotes: Note[]
) {
  const updates: Note[] = [];

  if (noteToPosition.localId === newPrev.localId) {
    return updates;
  }

  updates.push({
    ...noteToPosition,
    prev: newPrev.localId,
    parent: newPrev.parent,
  });

  const noteAfterNewPrev = sortedNotes.find((n) => n.prev === newPrev.localId);
  if (noteAfterNewPrev) {
    if (noteAfterNewPrev.localId === noteToPosition.localId) {
      throw new Error("Attempting to create circular reference");
    }

    updates.push({
      ...noteAfterNewPrev,
      prev: noteToPosition.localId,
    });
  }

  const noteAfterNoteToPosition = sortedNotes.find(
    (n) => n.prev === noteToPosition.localId
  );
  if (noteAfterNoteToPosition) {
    if (noteAfterNoteToPosition.localId === noteToPosition.prev) {
      throw new Error("Attempting to create circular reference");
    }

    updates.push({
      ...noteAfterNoteToPosition,
      prev: noteToPosition.prev,
    });
  }

  return updates;
}

export async function getLocalOnlyNotes() {
  const notes = await getAllNotes();
  return notes.filter((note) => {
    return !note._id;
  });
}

export async function syncLocalNotes() {
  const localNotesToSync = await getLocalOnlyNotes();

  for (const note of localNotesToSync) {
    await createRemoteNote(note);
  }
}
