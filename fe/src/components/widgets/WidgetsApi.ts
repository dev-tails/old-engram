import { Note } from "../notes/NotesApi";

export type WidgetData = {
  _id: string;
  items: Note[];
};

export async function getWidget(id: string): Promise<WidgetData> {
  return {
    _id: "1",
    items: [
      {
        _id: "5fb027d8a0c0ebd283add8ae",
        body: "This is item 1",
      },
      {
        _id: "2",
        body: "This is item 2",
      },
    ],
  };
}

export async function submitWidgetNote(widgetId: string, note: string) {}
