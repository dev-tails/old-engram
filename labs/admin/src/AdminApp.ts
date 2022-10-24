import { Div } from '../../ui/components';
import { Button } from '../../ui/components/Button';
import { Modal } from '../../ui/components/Modal';
import { addTableRow, Table } from '../../ui/components/Table';
import { fetchRooms } from './apis/AdminRoomApi';
import { fetchUsers } from './apis/AdminUserApi';
import { CreateUserModal } from './views/CreateDocumentModal';

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

const collections = ["users", "rooms"];
for (const collectionName of collections) {
  const collectionEl = Div({
    innerText: collectionName,
    onClick: () => {
      window.location.href = `/${collectionName}`;
    },
  });
  collectionSelect.append(collectionEl);
}

const collectionParam = window.location.pathname.split("/")[1];

const collectionView = Div();
page.append(collectionView);

const collectionViewHeader = Div({
  styles: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
collectionView.append(collectionViewHeader);

const collectionViewTitle = Div({
  styles: {
    textTransform: "capitalize",
  },
  innerText: collectionParam,
});

collectionViewHeader.append(collectionViewTitle);

const addDocumentButton = Button({
  innerText: "+",
  onClick: () => {
    Modal.open(
      CreateUserModal({
        onSubmit: handleDocumentSubmitted,
      })
    );
  },
});
collectionViewHeader.append(addDocumentButton);

const listFieldsByCollection = {
  users: ["_id", "name", "email", "color"],
  rooms: ["_id", "name"],
};

const userTable = Table({
  rows: [listFieldsByCollection[collectionParam]],
});
collectionView.append(userTable);

function handleDocumentSubmitted(doc: any) {
  Modal.close();

  const rowValues = [];
  for (const field of listFieldsByCollection[collectionParam]) {
    rowValues.push(doc[field]);
  }

  addTableRow(userTable, rowValues);
}

async function init() {
  let docs = [];
  switch (collectionParam) {
    case "rooms":
      docs = await fetchRooms();
      break;
    case "users":
      docs = await fetchUsers();
      break;
  }

  for (const doc of docs) {
    const rowValues = [];
    for (const field of listFieldsByCollection[collectionParam]) {
      rowValues.push(doc[field]);
    }

    addTableRow(userTable, rowValues);
  }
}

init();

Modal.init(root);
