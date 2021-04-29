import axios from "axios";
import { Note } from "./components/notes/NotesApi";

export async function createKey() {
  const res = await axios.post("/api/keys");
  const newKey = res.data.key;
  return newKey;
}

export async function deleteKey(id: string) {
  await axios.delete(`/api/keys/${id}`);
}

export async function zapNote(note: Note) {
  await axios.post(`/api/zapier/zap`, note);
}
