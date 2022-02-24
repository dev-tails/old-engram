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

  // ../ui/components/Modal.ts
  var root = null;
  var currentModal = null;
  function init(rootEl) {
    root = rootEl;
  }
  function ModalElement(props) {
    const el = Div({
      styles: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        background: "rgba(0, 0, 0, 0.5)"
      }
    });
    const modalContent = Div({
      styles: {
        maxWidth: "960px",
        width: "90%",
        height: "90%",
        margin: "0 auto",
        background: "white"
      }
    });
    el.append(modalContent);
    modalContent.append(props.children);
    return el;
  }
  function open(el) {
    currentModal = ModalElement({
      children: el
    });
    root.append(currentModal);
  }
  function close() {
    currentModal.remove();
  }
  var Modal = {
    init,
    open,
    close
  };

  // ../ui/components/Table.ts
  function Table(props) {
    const table = document.createElement("table");
    for (const row of props.rows) {
      addTableRow(table, row);
    }
    return table;
  }
  function addTableRow(table, row) {
    const rowEl = document.createElement("tr");
    table.append(rowEl);
    for (const rowText of row) {
      const columnEl = document.createElement("td");
      columnEl.innerText = rowText;
      rowEl.append(columnEl);
    }
  }

  // src/apis/AdminUserApi.ts
  async function postCreateUser(user) {
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
    const jsonData = await res.json();
    return jsonData.data;
  }
  async function fetchUsers() {
    const res = await fetch("/api/admin/users");
    const jsonData = await res.json();
    return jsonData.data;
  }

  // ../ui/components/TextArea.ts
  function TextArea(props) {
    const el = document.createElement("textarea");
    setElementStyles(el, props.styles);
    return el;
  }

  // src/views/CreateDocumentModal.ts
  function CreateUserModal(props) {
    const el = Div({
      styles: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%"
      }
    });
    const textarea = TextArea({
      styles: {
        flex: "1",
        width: "100%",
        resize: "none"
      }
    });
    el.append(textarea);
    const actions = Div({
      styles: {
        display: "flex",
        justifyContent: "end",
        flexShrink: "0",
        padding: "8px"
      }
    });
    el.append(actions);
    const cancelButton = Button({
      innerText: "Cancel",
      styles: {
        marginRight: "8px"
      },
      onClick: Modal.close
    });
    actions.append(cancelButton);
    const submitButton = Button({
      innerText: "Submit",
      onClick: async () => {
        try {
          const doc = JSON.parse(textarea.value);
          const createdDoc = postCreateUser(doc);
          props.onSubmit(createdDoc);
        } catch (err) {
          alert(err.message);
        }
      }
    });
    actions.append(submitButton);
    return el;
  }

  // src/AdminApp.ts
  var root2 = document.getElementById("root");
  var page = Div({
    styles: {
      display: "flex"
    }
  });
  root2.append(page);
  var collectionSelect = Div({
    styles: {}
  });
  page.append(collectionSelect);
  var collections = ["Users", "Rooms"];
  for (const collectionName of collections) {
    const collectionEl = Div({
      innerText: collectionName
    });
    collectionSelect.append(collectionEl);
  }
  var collectionView = Div();
  page.append(collectionView);
  var collectionViewHeader = Div({
    styles: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  });
  collectionView.append(collectionViewHeader);
  var collectionViewTitle = Div({
    innerText: "Users"
  });
  collectionViewHeader.append(collectionViewTitle);
  var addDocumentButton = Button({
    innerText: "+",
    onClick: () => {
      Modal.open(CreateUserModal({
        onSubmit: handleDocumentSubmitted
      }));
    }
  });
  collectionViewHeader.append(addDocumentButton);
  var userTable = Table({
    rows: [["_id", "name", "email", "color"]]
  });
  collectionView.append(userTable);
  function handleDocumentSubmitted(doc) {
    Modal.close();
    addTableRow(userTable, [doc._id, doc.name, doc.email, doc.color]);
  }
  async function init2() {
    const users = await fetchUsers();
    for (const user of users) {
      addTableRow(userTable, [user._id, user.name, user.email, user.color]);
    }
  }
  init2();
  Modal.init(root2);
})();
