import { setElementStyles } from "./Element";

type ButtonProps = {
  innerText?: string;
  styles?: Partial<CSSStyleDeclaration>;
};

export function Button(props?: ButtonProps) {
  const el = document.createElement("button");

  setElementStyles(el, props.styles);

  el.innerText = props.innerText;

  return el;
}
