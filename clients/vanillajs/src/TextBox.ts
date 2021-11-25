import './TextBox.css';

import { Div } from './Div';
import { ElementUtils } from './ElementUtils';
import { Input } from './Input';

export function TextBox() {
  const el = Div();
  el.setAttribute("class", "textbox")

  const input = Input()
  // ElementUtils.setStyles(input, {
  //   border: "none",
  //   "border-bottom": "1px solid black",
  //   width: "100%"
  // })
  el.appendChild(input)

  ElementUtils.setStyles(el, {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    padding: "8px"
  })

  return el;
}