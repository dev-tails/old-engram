import { Div } from '../../../ui/components';
import { Button } from '../../../ui/components/Button';
import { Modal } from '../../../ui/components/Modal';
import { TextArea } from '../../../ui/components/TextArea';
import { postCreateUser } from '../apis/AdminUserApi';

type CreateDocumentModalProps = {
  onSubmit: (doc: Object) => void;
};

export function CreateUserModal(props: CreateDocumentModalProps) {
  const el = Div({
    styles: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    },
  });

  const textarea = TextArea({
    styles: {
      flex: "1",
      width: "100%",
      resize: "none",
    },
  });
  el.append(textarea);

  const actions = Div({
    styles: {
      display: "flex",
      justifyContent: "end",
      flexShrink: "0",
      padding: "8px",
    },
  });
  el.append(actions);

  const cancelButton = Button({
    innerText: "Cancel",
    styles: {
      marginRight: "8px",
    },
    onClick: Modal.close,
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
    },
  });
  actions.append(submitButton);

  return el;
}
