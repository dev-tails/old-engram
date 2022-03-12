import { byId } from "../../ui/utils/DomUtils";
import { NoteList } from "./views/NoteList";

const root = byId("root");

root.appendChild(NoteList({
  notes: [
    {
      _id: "1",
      body: "Hello World"
    }
  ]
}));