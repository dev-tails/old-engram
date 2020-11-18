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
        _id: "1",
        body: "This is item 1",
      },
      {
        _id: "2",
        body: "This is item 2",
      },
    ],
  };
}
