import { Button } from "../../../ui/components/Button";
import { Div } from "../../../ui/components/Div";
import { pageApi } from "../apis/PageApi";
import { SidebarItem } from "./Sidebar";

export async function PageContent(item: SidebarItem) {
  const el = Div({
    styles: {
      flexGrow: "1",
    },
  });

  const page = await pageApi.getById(item._id);

  const title = Div({
    innerText: page.body,
  });
  el.append(title);

  const addTextButton = Button({
    innerText: "+",
    onClick: async () => {
      const newTextContent = await pageApi.create({
        type: "text",
        parent: page._id
      });
      addContent(newTextContent);
    },
  });
  el.append(addTextButton);

  const content = page.content || []
  for (const contentId of content) {
    const content = await pageApi.getById(contentId);

    addContent(content);
  }

  function addContent(content) {
    const noteBodyEl = Div({
      innerText: content.body,
      styles: {
        width: "100%",
      },
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
