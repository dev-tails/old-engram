import { byId } from "../../ui/utils/DomUtils";
import { blockApi } from "./apis/BlockApi";
import { userApi } from "./apis/UserApi";
import { BottomBar } from "./views/BottomBar";
import { NoteList } from "./views/NoteList";

async function main() {
  const root = byId("root");

  const user = await userApi.getSelf();
  let isLoggedIn = !!user;
  while (!isLoggedIn) {
    const email = prompt("email?");
    const password = prompt("password?");

    try {
      await userApi.login({
        email,
        password,
      });
      isLoggedIn = true;
    } catch (err) {}
  }

  const notes = await blockApi.getAll({
    type: "text",
  });

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
