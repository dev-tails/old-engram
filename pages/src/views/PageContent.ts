import { Button } from '../../../ui/components/Button';
import { Div } from '../../../ui/components/Div';
import { pageApi } from '../apis/PageApi';
import { SidebarItemType } from './Sidebar';

export async function PageContent(item: SidebarItemType) {
  const el = Div({
    styles: {
      flexGrow: "1",
    },
  });

  const page = await pageApi.getById(item._id);

  const pageHeader = Div({
    styles: {
      display: "flex",
      justifyContent: "space-between",
    },
  });

  const title = Div({
    innerText: page.body,
  });
  pageHeader.append(title);

  const removeBtn = Button({
    innerText: "🗑️",
    onClick() {
      if (confirm("Are you sure you want to delete the page!")) {
        pageApi.removeById(item._id);
        window.location.reload();
      }
    },
  });
  pageHeader.append(removeBtn);
  el.append(pageHeader);

  const addTextButton = Button({
    innerText: "+",
    onClick: async () => {
      const newTextContent = await pageApi.create({
        type: "text",
        parent: page._id,
        body: "",
      });
      addContent(newTextContent, true);
    },
  });
  el.append(addTextButton);

  const content = page.content || [];
  for (const contentId of content) {
    const content = await pageApi.getById(contentId);

    addContent(content);
  }

  function addContent(content, focusText = false) {
    const noteContentEl = Div({
      styles: {
        display: "flex",
      },
    });
    el.append(noteContentEl);

    const noteBodyEl = Div({
      innerText: content.body,
      styles: {
        width: "100%",
      },
    });

    noteBodyEl.contentEditable = "true";

    if (focusText) {
      setTimeout(function () {
        noteBodyEl.focus();
      }, 0);
    }

    const intervalId = setInterval(() => {
      if (content.body !== noteBodyEl.innerText) {
        pageApi
          .update(content._id, {
            body: noteBodyEl.innerText,
          })
          .catch((err) => {
            alert(err.message);
          });
        content.body = noteBodyEl.innerText;
      }
    }, 3000);

    el.addEventListener("DOMNodeRemoved", (e) => {
      if (e.target !== el) {
        return;
      }
      clearInterval(intervalId);
    });

    noteContentEl.append(noteBodyEl);

    const removeBtn = Button({
      innerText: "🗑️",
      styles: {
        height: "24px",
      },
      onClick() {
        pageApi.removeById(content._id);
        noteContentEl.remove();
      },
    });
    noteContentEl.append(removeBtn);
  }

  const form = document.createElement("form");
  form.action = "/api/files";
  form.method = "post";
  form.enctype = "multipart/form-data";

  const input = document.createElement("input");
  input.name = "file_upload";
  input.type = "file";

  form.append(input);

  const submit = document.createElement("button");
  submit.type = "submit";
  submit.innerText = "Submit";
  form.append(submit);

  el.append(form);

  return el;
}
