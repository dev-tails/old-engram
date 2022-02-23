export function Div(params?: {
  styles?: Partial<CSSStyleDeclaration>;
  innerText?: string;
}) {
  const el = document.createElement("div");

  if (params?.styles) {
    for (const key of Object.keys(params.styles)) {
      el.style[key] = params.styles[key];
    }
  }

  if (params?.innerText) {
    el.innerText = params.innerText
  }

  return el;
}