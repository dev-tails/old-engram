import { openDB, DBSchema, IDBPDatabase } from "idb";
import { v4 as uuidv4 } from "uuid";

interface MyDB extends DBSchema {
  users: {
    value: {
      localId?: string;
    };
    key: string;
  };
  notes: {
    value: {
      _id?: string;
      body?: string;
      localId?: string;
    };
    key: string;
  };
}

let _db: IDBPDatabase<MyDB> | null = null;

export async function initializeDb() {
  if (_db) {
    return _db;
  }

  _db = await openDB<MyDB>("engram-db", 1, {
    upgrade(db) {
      db.createObjectStore("notes", {
        keyPath: "localId",
      });
      db.createObjectStore("users", {
        keyPath: "localId",
      });
    },
  });

  return _db;
}

export function getId() {
  return uuidv4();
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

export async function addUser() {
  const db = await initializeDb();
  const newUser = { localId: getId() };
  await db.add("users", newUser);
  console.log(newUser);
  return newUser;
}

export async function getUser() {
  const db = await initializeDb();
  const users = await db.getAll("users");
  return users[0];
}
