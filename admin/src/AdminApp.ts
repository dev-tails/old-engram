import { Div } from '../../ui/components';
import { Button } from '../../ui/components/Button';
import { Modal } from '../../ui/components/Modal';
import { addTableRow, Table } from '../../ui/components/Table';
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

const collections = ["Users", "Rooms"];
for (const collectionName of collections) {
  const collectionEl = Div({
    innerText: collectionName,
  });
  collectionSelect.append(collectionEl);
}

const collectionView = Div();
page.append(collectionView);

const collectionViewHeader = Div({
  styles: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
})
collectionView.append(collectionViewHeader)

const collectionViewTitle = Div({
  innerText: "Users",
});

collectionViewHeader.append(collectionViewTitle);

const addDocumentButton = Button({
  innerText: "+",
  onClick: () => {
    Modal.open(CreateUserModal({
      onSubmit: handleDocumentSubmitted
    }))
  }
})
collectionViewHeader.append(addDocumentButton);

const userTable = Table({
  rows: [["_id", "name", "email", "color"]],
});
collectionView.append(userTable);

function handleDocumentSubmitted(doc: any) {
  Modal.close();
  addTableRow(userTable, [doc._id, doc.name, doc.email, doc.color])
}

async function init() {
  // const users = await fetchUsers()  
  const users = [{
    _id: "1",
    name: "Adam Berg",
    email: "adam@xyzdigital.com",
    color: "#FF0000"
  }]

  for (const user of users) {
    addTableRow(userTable, [user._id, user.name, user.email, user.color]);
  }
}

init();

Modal.init(root);
