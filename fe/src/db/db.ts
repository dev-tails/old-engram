import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { v4 as uuidv4 } from 'uuid';

import { Key } from './Key';

export type NoteType =
  | "note"
  | "task"
  | "task_completed"
  | "event"
  | "workspace"
  | "page";

export type DBNote = {
  _id?: string;
  localId: string;
  date?: string;
  body?: string;
  checked?: boolean;
  archived?: boolean;
  type?: NoteType;
  start?: Date;
  parent?: string;
  prev?: string;
  createdAt?: Date;
  updatedAt?: Date;
  syncedAt?: Date;
};

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
  iv?: Uint8Array;
  encryptedBody?: string;
  createdAt?: Date;
  updatedAt?: Date;
  syncedAt?: Date;
};

type Device = {
  localId: string;
  createdAt?: Date;
  updatedAt?: Date;
  syncedAt?: Date;
};

interface MyDB extends DBSchema {
  devices: {
    value: Device;
    key: string;
  };
  keys: {
    value: Key;
    key: string;
  };
  notes: {
    value: Note;
    key: string;
    indexes: { parent: string };
  };
}

let _db: Promise<IDBPDatabase<MyDB>> | null = null;

export function initializeDb() {
  if (_db) {
    return _db;
  }

  _db = openDB<MyDB>("engram-db", 2, {
    upgrade(db, oldVersion, newVersion) {
      if (oldVersion < 1) {
        const notesStore = db.createObjectStore("notes", {
          keyPath: "localId",
        });

        notesStore.createIndex("parent", "parent");

        db.createObjectStore("devices", {
          keyPath: "localId",
        });
      }

      if (oldVersion < 2) {
        db.createObjectStore("keys", {
          keyPath: "localId",
        });
      }
    },
  });

  return _db;
}

export async function destroyDb() {
  const db = await initializeDb();

  db.clear("devices");
  db.clear("keys");
  db.clear("notes");
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

  const date = new Date();
  const addedNote = { ...value, createdAt: date, updatedAt: date };
  await db.add("notes", addedNote);
  return addedNote;
}

export async function putNote(value: MyDB["notes"]["value"]) {
  const db = await initializeDb();
  const updatedNote = { ...value, updatedAt: new Date() };
  await db.put("notes", updatedNote);
  return updatedNote;
}

export async function insertOrUpdateNote(value: DBNote) {
  const item = value.localId ? await getNote(value.localId) : null;
  if (!item) {
    return addNote(value);
  } else {
    return putNote(value);
  }
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

export async function addDevice(): Promise<Device> {
  const db = await initializeDb();
  const date = new Date();
  const newDevice = { localId: getId(), createdAt: date, updatedAt: date };
  await db.add("devices", newDevice);
  return newDevice;
}

let addDevicePromise: Promise<Device>;

export async function getDevice() {
  const db = await initializeDb();
  const devices = await db.getAll("devices");
  if (devices.length) {
    return devices[0];
  } else {
    if (!addDevicePromise) {
      addDevicePromise = addDevice();
    }
    return addDevicePromise;
  }
}

export async function putDevice(value: MyDB["devices"]["value"]) {
  const db = await initializeDb();
  await db.put("devices", { ...value, updatedAt: new Date() });
  return value;
}

export async function addKey(key: JsonWebKey): Promise<Key> {
  const db = await initializeDb();
  const date = new Date();
  const newKey = {
    ...key,
    localId: getId(),
    createdAt: date,
    updatedAt: date,
  } as Key;
  await db.add("keys", newKey);
  return newKey;
}

export async function getKey() {
  const db = await initializeDb();
  const keys = await db.getAll("keys");
  if (keys.length) {
    return keys[0];
  } else {
    return null;
  }
}
