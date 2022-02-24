import { setElementStyles } from "./Element";

export function Div(params?: {
  styles?: Partial<CSSStyleDeclaration>;
  innerText?: string;
}) {
  const el = document.createElement("div");

  setElementStyles(el, params?.styles)

  if (params?.innerText) {
    el.innerText = params.innerText
  }

  return el;
}