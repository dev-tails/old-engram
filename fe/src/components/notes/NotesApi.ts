import axios from "axios";

export type Note = {
  _id?: string;
  body: string;
  checked?: boolean;
};

export async function getNotes(): Promise<Note[]> {
  const res = await axios.get("/api/notes", { withCredentials: true });
  return res.data;
}

export async function updateNote(note: Partial<Note>): Promise<Note> {
  const res = await axios.put(`/api/notes/${note._id}`, {
    withCredentials: true,
  });
  return res.data;
}
