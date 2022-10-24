import { byId } from "../../ui/utils/DomUtils";
import { Table } from "./views/Table";

async function main() {
  const root = byId("root")

  root.append(Table());
}

main();