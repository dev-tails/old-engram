import { setElementStyles } from "./Element";

type TextAreaProps = {
  styles?: Partial<CSSStyleDeclaration>;
};

export function TextArea(props: TextAreaProps) {
  const el = document.createElement("textarea");

  setElementStyles(el, props.styles);

  return el;
}
