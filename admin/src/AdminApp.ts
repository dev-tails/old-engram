import { Div } from '../../ui/components';
import { Table } from '../../ui/components/Table';

const root = document.getElementById("root");

const page = Div({
  styles: {
    display: "flex",
  },
});
root.append(page);

const collectionSelect = Div({
  styles: {},
});
page.append(collectionSelect);

const collections = ["Users", "Rooms"];
for (const collectionName of collections) {
  const collectionEl = Div({
    innerText: collectionName,
  });
  collectionSelect.append(collectionEl);
}

const collectionView = Div();
page.append(collectionView);

const collectionViewTitle = Div({
  innerText: "Users",
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
    rows: rows,
  });
  collectionView.append(userTable);
}

init();
