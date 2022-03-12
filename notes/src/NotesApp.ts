import { byId } from "../../ui/utils/DomUtils";
import { blockApi } from "./apis/BlockApi";
import { BottomBar } from "./views/BottomBar";
import { NoteList } from "./views/NoteList";

const root = byId("root");

const noteList = NoteList({
  notes: [
    {
      _id: "1",
      body: "Hello World",
    },
    {
      _id: "2",
      body: "This is notes",
    },
  ],
});

root.appendChild(noteList.el);

root.appendChild(
  BottomBar({
    async onSubmit(body) {
      const newBlock = await blockApi.create({ type: "text", body });
      noteList.addNote(newBlock);
    },
  })
);
