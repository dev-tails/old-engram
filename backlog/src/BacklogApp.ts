import { Div } from "../../ui/components/Div";
import { byId } from "../../ui/utils/DomUtils";
import { Task } from "./views/Task";

const root = byId("root");

const list = Div();

const tasks = [
  {
    body: "Task 1"
  },
  {
    body: "Task 2"
  }
]

for (const task of tasks) {
  list.append(Task({
    task
  }))
}

root.append(list);