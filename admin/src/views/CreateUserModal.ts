import { Div } from "../../../ui/components";
import { Button } from "../../../ui/components/Button";
import { TextArea } from "../../../ui/components/TextArea";

export function CreateUserModal() {
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
    }
  })
  actions.append(cancelButton)

  const submitButton = Button({
    innerText: "Submit"
  })
  actions.append(submitButton)

  return el;
}
