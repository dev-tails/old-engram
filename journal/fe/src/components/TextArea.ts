import { setStyle } from "../utils/DomUtils";

export function TextArea() {
  const el = document.createElement("textarea");

  setStyle(el, {
    width: "100%"
  });

  return el;
}
