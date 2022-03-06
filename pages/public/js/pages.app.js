(() => {
  // ../ui/components/Element.ts
  function setElementStyles(el, styles) {
    if (!styles) {
      return;
    }
    for (const key of Object.keys(styles)) {
      el.style[key] = styles[key];
    }
  }

  // ../ui/components/Div.ts
  function Div(params) {
    const el = document.createElement("div");
    setElementStyles(el, params?.styles);
    if (params?.innerText) {
      el.innerText = params.innerText;
    }
    if (params?.onClick) {
      el.addEventListener("click", () => {
        params.onClick();
      });
    }
    return el;
  }

  // src/apis/Api.ts
  var Api = class {
    async get(url) {
      const res = await fetch(url);
      if (res.ok) {
        const jsonData = await res.json();
        return jsonData.data;
      } else {
        throw new Error(`${res.status} Request Failed`);
      }
    }
    async post(url, params) {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      });
      if (res.ok) {
        const jsonData = await res.json();
        return jsonData.data;
      } else {
        throw new Error(`${res.status} Request Failed`);
      }
    }
  };

  // src/apis/PageApi.ts
  var PageApi = class extends Api {
    async getById(id) {
      return this.get(`/api/pages/${id}`);
    }
    async getAll() {
      return this.get("/api/pages");
    }
    async create(params) {
      return this.post("/api/pages", params);
    }
  };
  var pageApi = new PageApi();

  // src/views/PageContent.ts
  async function PageContent(item) {
    const el = Div({
      styles: {
        flexGrow: "1"
      }
    });
    const page = await pageApi.getById(item._id);
    const title = Div({
      innerText: page.body
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
      }, 3e3);
      el.append(noteBodyEl);
    }
    return el;
  }

  // ../ui/components/Button.ts
  function Button(props) {
    const el = document.createElement("button");
    setElementStyles(el, props?.styles);
    el.innerText = props?.innerText;
    if (props?.onClick) {
      el.addEventListener("click", props.onClick);
    }
    return el;
  }

  // src/views/Sidebar.ts
  function Sidebar(props) {
    const el = Div({
      styles: {
        flexShrink: "0",
        width: "300px"
      }
    });
    const addButton = Button({
      innerText: "+"
    });
    addButton.addEventListener("click", async () => {
      const pageName = prompt("Page Name");
      const newPage = await pageApi.create({
        body: pageName
      });
      addItemsAndContent([{ title: pageName }]);
    });
    el.append(addButton);
    function addItemsAndContent(items, depth = 0) {
      if (!items || items.length === 0) {
        return;
      }
      for (const item of items) {
        el.append(SidebarItem({ item, depth, onClick: props.onClick }));
        addItemsAndContent(item.content, depth + 1);
      }
    }
    addItemsAndContent(props.items);
    return el;
  }
  function SidebarItem(props) {
    const el = Div({
      styles: {
        display: "flex",
        alignItems: "center",
        marginLeft: `${8 * props.depth}px`
      },
      onClick: () => {
        props.onClick(props.item);
      }
    });
    const dropdownArrow = Div({
      innerText: ">"
    });
    el.append(dropdownArrow);
    const text = Div({
      innerText: props.item.title
    });
    el.append(text);
    return el;
  }

  // src/PagesApp.ts
  async function main() {
    const root = document.getElementById("root");
    const pages = await pageApi.getAll();
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
          if (contentNote?.type !== "page") {
            continue;
          }
          itemContent.push({
            _id: contentNote._id,
            title: contentNote.body
          });
        }
      }
      sidebarItems.push({
        _id: note._id,
        title: note.body,
        content: itemContent
      });
    }
    const container = Div({
      styles: {
        display: "flex"
      }
    });
    root.append(container);
    container.append(Sidebar({
      items: sidebarItems,
      onClick: handlePageClicked
    }));
    let pageContent = null;
    async function handlePageClicked(item) {
      if (pageContent) {
        pageContent.remove();
      }
      pageContent = await PageContent(item);
      container.append(pageContent);
    }
  }
  main();
})();
