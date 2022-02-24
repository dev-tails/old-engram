type TableProps = {
  rows: string[][];
};

export function Table(props: TableProps) {
  const table = document.createElement("table");

  for (const row of props.rows) {
    addTableRow(table, row);
  }

  return table;
}

export function addTableRow(table: HTMLTableElement, row: string[]) {
  const rowEl = document.createElement("tr");
  table.append(rowEl);

  for (const rowText of row) {
    const columnEl = document.createElement("td");
    columnEl.innerText = rowText;
    rowEl.append(columnEl);
  }
}
