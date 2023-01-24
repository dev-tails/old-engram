import { onClick, setStyle } from "../utils/DomUtils";
import { Button } from "../components/Button";
import { Div } from "../components/Div";
import { getDate } from "../services/DateService";

export function Header() {
  const el = Div();

  setStyle(el, {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "48px",
    backgroundColor: "#3f51b5",
    color: "white"
  });

  function handleIncrementDate(days: number) {
    let date = getDate();
    date.setDate(date.getDate() + days);
    handleDateUpdated();
  }

  // BTN LEFT
  const btnDateLeft = Button();
  btnDateLeft.innerText = "<";

  onClick(btnDateLeft, () => {
    handleIncrementDate(-1);
  });

  el.append(btnDateLeft);

  // DATE
  const dateEl = Div();
  setStyle(dateEl, {
    margin: "0 8px",
  });

  function handleDateUpdated() {
    dateEl.innerText = getDate().toLocaleDateString();
  }

  handleDateUpdated();

  el.append(dateEl);

  // BTN RIGHT
  const btnDateRight = Button();
  btnDateRight.innerText = ">";

  el.append(btnDateRight);

  onClick(btnDateRight, () => {
    handleIncrementDate(1);
  });

  return el;
}
