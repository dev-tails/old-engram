function setStyles(el: HTMLElement, styles: Partial<CSSStyleDeclaration | any>) {
  Object.assign(el.style, styles);
}

export const ElementUtils = {
  setStyles,
};
