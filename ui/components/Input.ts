import { setElementStyles } from "./Element";

export type InputProps = {
  type?: string;
  styles?: Partial<CSSStyleDeclaration>;
}

export function Input(props?: InputProps) {
  const input = document.createElement("input");

  input.type = props?.type || "text";
  setElementStyles(input, props?.styles)

  return input;
}