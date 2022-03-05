import { Div } from "../../../ui/components/Div";
import { notesById } from "../data/Notes";
import { SidebarItem } from "./Sidebar";

export function PageContent(item: SidebarItem) {
  const el = Div();

  const title = Div({
    innerText: item.title,
  });
  el.append(title);

  const note = notesById[item._id];

  for (const contentId of note.content) {
    const noteContent = notesById[contentId];

    const noteBodyEl = Div({
      innerText: noteContent.body,
    });
    noteBodyEl.contentEditable = "true";

    setInterval(() => {
      if (noteContent.body !== noteBodyEl.innerText) {
        console.log(noteContent.body);
        console.log(noteBodyEl.innerText);
        console.log("different");
        noteContent.body = noteBodyEl.innerText;
      }
    }, 3000);

    el.append(noteBodyEl);
  }

  return el;
}
