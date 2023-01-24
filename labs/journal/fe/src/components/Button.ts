import { setStyle } from "../utils/DomUtils";

export function Button() {
  const el = document.createElement("button");

  setStyle(el, {
    border: "none",
    background: "none",
    cursor: "pointer",
    color: "white"
  })

  return el;
}