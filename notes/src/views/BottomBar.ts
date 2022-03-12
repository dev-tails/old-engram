import { Button } from "../../../ui/components/Button";
import { Div } from "../../../ui/components/Div";
import { Input } from "../../../ui/components/Input";

export function BottomBar() {
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

  el.append(input);

  const submitBtn = Button({
    innerText: ">",
    onClick() {
      input.value = "";
    }
  })
  el.append(submitBtn)

  
  return el;
}