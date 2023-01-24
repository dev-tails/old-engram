export function byId(id: string) {
  return document.getElementById(id);
}

export function bySelector(element: Element, selector: string): HTMLDivElement {
  return element.querySelector(selector);
}

export function setText(el: HTMLElement, text: string) {
  el.innerText = text;
}

export function onClick(el: HTMLElement, handler: (event: MouseEvent) => any) {
  return el.addEventListener('click', handler, true);
}

export function onMouseOver(
  el: HTMLElement,
  handler: (event: MouseEvent) => any
) {
  return el.addEventListener('mouseover', handler);
}

export function onMouseLeave(
  el: HTMLElement,
  handler: (event: MouseEvent) => any
) {
  return el.addEventListener('mouseleave', handler);
}

export function setStyle(
  el: HTMLElement,
  styles: Partial<CSSStyleDeclaration>
) {
  for (const key of Object.keys(styles)) {
    el.style[key] = styles[key];
  }
}

export function bottomPosition(element) {
  return element.getBoundingClientRect().bottom;
}
