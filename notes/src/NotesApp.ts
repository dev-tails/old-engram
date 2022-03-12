import { byId } from "../../ui/utils/DomUtils";
import { blockApi } from "./apis/BlockApi";
import { BottomBar } from "./views/BottomBar";
import { NoteList } from "./views/NoteList";

async function main() {
  const root = byId("root");

  const notes = await blockApi.getAll({
    type: "text"
  })

  const noteList = NoteList({
    notes,
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
}

main();
