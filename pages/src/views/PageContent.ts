import { Div } from "../../../ui/components/Div";
import { pageApi } from "../apis/PageApi";
import { SidebarItem } from "./Sidebar";

export async function PageContent(item: SidebarItem) {
  const el = Div({
    styles: {
      flexGrow: "1"
    }
  });

  const page = await pageApi.getById(item._id)

  const title = Div({
    innerText: page.body,
  });
  el.append(title);

  for (const contentId of page.content) {
    const content = await pageApi.getById(contentId);

    const noteBodyEl = Div({
      innerText: content.body,
      styles: {
        width: "100%"
      }
    });

    noteBodyEl.contentEditable = "true";

    setInterval(() => {
      if (content.body !== noteBodyEl.innerText) {
        content.body = noteBodyEl.innerText;
      }
    }, 3000);

    el.append(noteBodyEl);
  }

  return el;
}
