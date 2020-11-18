import axios from "axios";
import { Note } from "../notes/NotesApi";

export type WidgetData = {
  widget: {
    _id: string;
    name: string;
  };
  items: Note[];
};

export async function getWidget(id: string): Promise<WidgetData> {
  const res = await axios.get(`/api/widgets/${id}`);
  return res.data;
}

export async function submitWidgetNote(widgetId: string, note: string) {}
