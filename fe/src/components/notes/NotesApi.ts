import axios from "axios";
import * as Api from "../../Api";
import queryString from "query-string";

export type Note = {
  _id?: string;
  body: string;
  checked?: boolean;
};

export async function createNote(note: Partial<Note>) {
  const res = await axios.post(
    "/api/notes",
    { ...note },
    { withCredentials: true }
  );
  return res.data;
}

export type GetNotesParams = {
  since_id?: string;
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
