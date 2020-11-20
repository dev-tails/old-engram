import axios from "axios";
import { Note } from "../notes/NotesApi";

export type WidgetData = {
  widget: {
    _id: string;
    name: string;
  };
  items: Note[];
};

export async function getWidget(widgetId: string): Promise<WidgetData> {
  const res = await axios.get(`/api/widgets/${widgetId}`, {
    withCredentials: true,
  });
  return res.data;
}

export async function submitWidgetNote(
  widgetId: string,
  body: string
): Promise<Note> {
  const res = await axios.post(
    `/api/widgets/${widgetId}`,
    {
      body,
    },
    { withCredentials: true }
  );
  return res.data;
}
