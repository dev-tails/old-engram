import { Div } from "../../ui/components/Div";
import { byId } from "../../ui/utils/DomUtils";
import { Task } from "./views/Task";

const root = byId("root");

const list = Div();

const tasks = [
  {
    body: "Task 1",
  },
  {
    body: "Task 2",
  },
  {
    body: "Task 3",
  },
  {
    body: "Task 4",
  },
];

let dragIndex = -1;
const taskElements = [];

for (let i = 0; i < tasks.length; i++) {
  const task = tasks[i];

  const taskEl = Task({
    task,
    onDrag() {
      // TODO: i is no longer valid after first move
      dragIndex = i;
    },
    onDrop() {
      const dropIndex = i;
      const draggedTaskEl = taskElements[dragIndex];

      taskElements.splice(dragIndex, 1);
      taskElements.splice(dropIndex, 0, draggedTaskEl);

      list.innerHTML = null;
      for (const repositionedTaskElement of taskElements) {
        list.appendChild(repositionedTaskElement);
      }
    },
  });
  taskElements.push(taskEl);

  list.append(taskEl);
}

root.append(list);

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "c") {
    const newTaskEl = Task({
      task: {
        body: "",
      },
      onDrop: () => {},
      onDrag: () => {},
    });
    taskElements.push(newTaskEl);
    list.append(newTaskEl);
    newTaskEl.focus();
  }
});
