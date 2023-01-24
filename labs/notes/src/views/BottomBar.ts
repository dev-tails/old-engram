import { Button } from "../../../ui/components/Button";
import { Div } from "../../../ui/components/Div";
import { Input } from "../../../ui/components/Input";

export type BottomBarProps = {
  onSubmit: (body: string) => void;
}

export function BottomBar(props: BottomBarProps) {
  const el = Div({
    styles: {
      display: "flex",
      position: "fixed",
      bottom: "0",
      left: "0",
      right: "0",
      height: "32px",
      backgroundColor: "#000000",
    }
  });

  const input = Input({
    styles: {
      width: "100%",
      backgroundColor: "rgba(0,0,0,0)",
      color: "white",
      padding: "8px"
    }
  });
  input.addEventListener("keydown", (e) => {
    if (!e.shiftKey && e.key === "Enter") {
      handleSubmit();
    }
  })

  el.append(input);

  const submitBtn = Button({
    innerText: ">",
    onClick: handleSubmit
  })
  el.append(submitBtn)

  function handleSubmit() {
    props.onSubmit(input.value);
    input.value = "";
  }
  
  return el;
}