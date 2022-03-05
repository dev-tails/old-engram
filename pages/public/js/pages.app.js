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
    async getAll() {
      return this.get("/api/pages");
    }
    async create(params) {
      return this.post("/api/pages", params);
    }
  };
  var pageApi = new PageApi();

  // src/data/Notes.ts
  var notesById = {
    "1": {
      _id: "1",
      type: "page",
      body: "Web Development",
      content: ["2"]
    },
    "2": {
      _id: "2",
      parent: "1",
      type: "page",
      body: "How to Build Your First HTML Page",
      content: [
        "3"
      ]
    },
    "3": {
      _id: "2",
      parent: "2",
      type: "text",
      body: `# Pre-Requisites
    How to Setup Your Development Environment
    
    # Intro to HTML
    HTML stands for HyperText Markup Language. If you have never used it before you should read about the HTML Basics.
    
    # Creating Your First HTML Document
    Open VS Code
    Select File > Open Folder
    Create a new folder called code in your home directory
    Create another new folder inside the code folder called html-intro`
    }
  };

  // src/views/PageContent.ts
  function PageContent(item) {
    const el = Div();
    const title = Div({
      innerText: item.title
    });
    el.append(title);
    const note = notesById[item._id];
    for (const contentId of note.content) {
      const noteContent = notesById[contentId];
      const noteBodyEl = Div({
        innerText: noteContent.body
      });
      noteBodyEl.contentEditable = "true";
      setInterval(() => {
        if (noteContent.body !== noteBodyEl.innerText) {
          console.log(noteContent.body);
          console.log(noteBodyEl.innerText);
          console.log("different");
          noteContent.body = noteBodyEl.innerText;
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
    console.log(pages);
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
    function handlePageClicked(item) {
      if (pageContent) {
        pageContent.remove();
      }
      pageContent = PageContent(item);
      container.append(pageContent);
    }
  }
  main();
})();
