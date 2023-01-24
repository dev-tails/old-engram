export function byId(id: string) {
  return document.getElementById(id);
}

export function setText(el: HTMLElement, text: string) {
  el.innerText = text;
}

export function onClick(el: HTMLElement, handler: (event: MouseEvent) => any) {
  return el.addEventListener("click", handler);
}

export function setStyle(el: HTMLElement, styles: Partial<CSSStyleDeclaration>) {
  for (const key of Object.keys(styles)) {
    el.style[key] = styles[key];
  }
}