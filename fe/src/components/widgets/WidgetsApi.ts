import axios from "axios";
import { Note } from "../notes/NotesApi";

export type Widget = {
  _id: string;
  name: string;
  checkboxes?: boolean;
};

export type WidgetData = {
  widget: Widget;
  items: Note[];
};

export async function getWidgets(): Promise<Widget[]> {
  const res = await axios.get(`/api/widgets`, {
    withCredentials: true,
  });
  return res.data;
}

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
