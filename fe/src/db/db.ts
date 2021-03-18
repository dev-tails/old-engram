import { openDB, DBSchema, IDBPDatabase } from "idb";
import { v4 as uuidv4 } from "uuid";

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

interface MyDB extends DBSchema {
  devices: {
    value: {
      localId?: string;
    };
    key: string;
  };
  notes: {
    value: Note;
    key: string;
    indexes: { parent: string };
  };
}

let _db: IDBPDatabase<MyDB> | null = null;

export async function initializeDb() {
  if (_db) {
    return _db;
  }

  _db = await openDB<MyDB>("engram-db", 1, {
    upgrade(db) {
      const notesStore = db.createObjectStore("notes", {
        keyPath: "localId",
      });

      notesStore.createIndex("parent", "parent");

      db.createObjectStore("devices", {
        keyPath: "localId",
      });
    },
  });

  return _db;
}

export function getId() {
  return uuidv4();
}

export async function getNote(id: string) {
  const db = await initializeDb();
  return db.get("notes", id);
}

export async function addNote(value: MyDB["notes"]["value"]) {
  const db = await initializeDb();
  await db.add("notes", value);
}

export async function putNote(value: MyDB["notes"]["value"]) {
  const db = await initializeDb();
  await db.put("notes", value);
}

export async function deleteNote(id: string) {
  const db = await initializeDb();
  await db.delete("notes", id);
}

export async function getAllNotes() {
  const db = await initializeDb();
  return db.getAll("notes");
}

export async function getNotesByParent(parent: string) {
  const db = await initializeDb();
  return db.getAllFromIndex("notes", "parent", parent);
}

export async function addDevice() {
  const db = await initializeDb();
  const newDevice = { localId: getId() };
  await db.add("devices", newDevice);
  console.log(newDevice);
  return newDevice;
}

export async function getDevice() {
  const db = await initializeDb();
  const devices = await db.getAll("devices");
  return devices[0];
}
