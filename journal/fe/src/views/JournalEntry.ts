import { Div } from "../components/Div";
import { TextArea } from "../components/TextArea";
import { setStyle } from "../utils/DomUtils";

export function JournalEntry() {
  const el = Div();

  setStyle(el, {
    height: "calc(100vh - 50px)",
    width: "100%",
    maxWidth: "960px",
    resize: "horizontal",
    margin: "0 auto"
  });

  const textarea = TextArea();

  setStyle(textarea, {
      resize: "none",
      height: "100%"
  })

  el.append(textarea);

  return el;
}
