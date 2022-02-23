(() => {
  // ../ui/components/Div.ts
  function Div(params) {
    const el = document.createElement("div");
    if (params?.styles) {
      for (const key of Object.keys(params.styles)) {
        el.style[key] = params.styles[key];
      }
    }
    if (params?.innerText) {
      el.innerText = params.innerText;
    }
    return el;
  }

  // ../ui/components/Table.ts
  function Table(props) {
    const table = document.createElement("table");
    for (const row of props.rows) {
      const rowEl = document.createElement("tr");
      table.append(rowEl);
      for (const rowText of row) {
        const columnEl = document.createElement("td");
        columnEl.innerText = rowText;
        rowEl.append(columnEl);
      }
    }
    return table;
  }

  // src/AdminApp.ts
  var root = document.getElementById("root");
  var page = Div({
    styles: {
      display: "flex"
    }
  });
  root.append(page);
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
  var collectionViewTitle = Div({
    innerText: "Users"
  });
  collectionView.append(collectionViewTitle);
  async function init() {
    const res = await fetch("/api/admin/users");
    const jsonData = await res.json();
    const rows = [["_id", "name", "email", "color"]];
    for (const user of jsonData.data) {
      rows.push([user._id, user.name, user.email, user.color]);
    }
    const userTable = Table({
      rows
    });
    collectionView.append(userTable);
  }
  init();
})();
