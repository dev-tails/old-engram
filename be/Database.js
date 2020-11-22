import mongodb from "mongodb";
import { getEnv } from "./env.js";

export const ObjectId = mongodb.ObjectId;

let db = null;

export async function initializeDb() {
  const { url } = getEnv();
  const client = await mongodb.MongoClient.connect(url);
  db = client.db();

  console.log(`Connected`);
  return db;
}

export function getDb() {
  if (!db) {
    throw new Error("Database hasn't been initialized yet");
  }

  return db;
}
