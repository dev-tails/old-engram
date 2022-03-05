import { Div } from "../../ui/components/Div";
import { pageApi } from "./apis/PageApi";
import { PageContent } from "./views/PageContent";
import { Sidebar, SidebarItem } from "./views/Sidebar";

async function main() {
  const root = document.getElementById("root");

  const pages = await pageApi.getAll();
  console.log(pages)

  const pagesById = {};
  for (const page of pages) {
    pagesById[page._id] = page;
  }

  const sidebarItems = [];
  for (const key of Object.keys(pagesById)) {
    const note = pagesById[key];
    if (note.parent) {
      continue;
    }

    let itemContent = [];
    if (note.content) {
      for (const contentNoteId of note.content) {
        const contentNote = pagesById[contentNoteId];

        if (contentNote.type !== "page") {
          continue;
        }
        itemContent.push({
          _id: contentNote._id,
          title: contentNote.body,
        });
      }
    }

    sidebarItems.push({
      _id: note._id,
      title: note.body,
      content: itemContent,
    });
  }

  const container = Div({
    styles: {
      display: "flex",
    },
  });
  root.append(container);

  container.append(
    Sidebar({
      items: sidebarItems,
      onClick: handlePageClicked,
    })
  );

  let pageContent = null;

  function handlePageClicked(item: SidebarItem) {
    if (pageContent) {
      pageContent.remove();
    }

    pageContent = PageContent(item);
    container.append(pageContent);
  }
}

main();
