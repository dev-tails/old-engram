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

  const noteContentContainerEl = Div();
  el.append(noteContentContainerEl)

  const content = page.content || [];
  for (const contentId of content) {
    const content = await pageApi.getById(contentId);

    addContent(content);
  }

  function addContent(content, focusText = false) {
    const noteContentEl = Div({
      styles: {
        display: "flex",
        width: "100%"
      },
    });
    noteContentContainerEl.append(noteContentEl);

    if (content.type === "text") {
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

      noteBodyEl.addEventListener("DOMNodeRemoved", (e) => {
        if (e.target !== noteBodyEl) {
          return;
        }
        clearInterval(intervalId);
      });

      noteContentEl.append(noteBodyEl);
    } else if (content.type === "image") {
      const imgContaineEl = Div({
        styles: {
          flexGrow: "1"
        }
      });

      const imgEl = document.createElement("img");
      imgEl.style.width = "100%";
      imgEl.src = `/uploads/${content.fileUUID}`;
      imgContaineEl.append(imgEl)

      noteContentEl.append(imgContaineEl);
    }

    const removeBtn = Button({
      innerText: "🗑️",
      styles: {
        height: "24px",
        flexShrink: "0"
      },
      onClick() {
        pageApi.removeById(content._id);
        noteContentEl.remove();
      },
    });
    noteContentEl.append(removeBtn);
  }

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

  const input = document.createElement("input");
  input.style.display = "none";
  input.name = "file_upload";
  input.type = "file";

  input.addEventListener("change", async (e) => {
    if (input.files.length !== 1) {
      return alert("Must upload one image at a time");
    }

    const formData = new FormData();
    formData.append("file_upload", input.files[0]);

    const res = await fetch("/api/files", {
      method: "POST",
      body: formData,
    });
    const jsonData = await res.json();

    const newBlock = await pageApi.create({
      type: "image",
      fileUUID: jsonData.data.uuid,
      parent: page._id,
    });

    addContent(newBlock);
  });

  const addImageBtn = Button({
    innerText: "🖼️",
  });
  addImageBtn.addEventListener("click", () => {
    input.click();
  });
  el.append(addImageBtn);

  return el;
}
