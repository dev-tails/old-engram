export function El(kind: string) {
  return document.createElement(kind);
}

export function setElementStyles(
  el: HTMLElement,
  styles?: Partial<CSSStyleDeclaration> | null
) {
  if (!styles) {
    return;
  }

  for (const key of Object.keys(styles)) {
    el.style[key] = styles[key];
  }
}
