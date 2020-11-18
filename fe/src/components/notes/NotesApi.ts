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