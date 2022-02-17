type ButtonProps = {
  text: string;
};

export function Button(props: ButtonProps) {
  const el = document.createElement("button");

  el.innerText = props.text;

  return el;
}
