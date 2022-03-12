import { Div } from "../../../ui/components/Div";
import { setElementStyles } from "../../../ui/components/Element";

export type TableProps = {};

export function Table() {
  const table = document.createElement("table");
  setElementStyles(table, {
    borderSpacing: "0"
  })

  let alphabet = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  for (let i = 0; i < 100; i++) {
    const row = document.createElement("tr");

    for (const letter of alphabet) {
      const column = document.createElement("td");
      setElementStyles(column, {
        border: "1px solid black"
      })

      row.append(column);

      let colText = letter;
      if (!colText) {
        colText = i === 0 ? "" : String(i);
      }

      const cell = Div({
        innerText: colText,
      });
      column.append(cell);
    }

    table.append(row);
  }

  return table;
}
