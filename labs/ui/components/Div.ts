import { setElementStyles } from './Element';

export function Div(params?: {
  styles?: Partial<CSSStyleDeclaration>;
  innerText?: string;
  onClick?: () => void;
}) {
  const el = document.createElement("div");

  setElementStyles(el, params?.styles);

  if (params?.innerText) {
    el.innerText = params.innerText;
  }

  if (params?.onClick) {
    el.addEventListener("click", () => {
      params.onClick();
    });
  }

  return el;
}
