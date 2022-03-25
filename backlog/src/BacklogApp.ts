import { Div } from "../../ui/components/Div";
import { byId } from "../../ui/utils/DomUtils";
import { Task } from "./views/Task";

const root = byId("root");

const list = Div();

let sortedTasks = [];
const tasksAsString = localStorage.getItem("tasks");
if (tasksAsString) {
  sortedTasks = JSON.parse(tasksAsString);
}

let dragIndex = -1;
const taskElements = [];

for (let i = 0; i < sortedTasks.length; i++) {
  const task = sortedTasks[i];

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
    const newTask = {
      body: "",
      order: sortedTasks.length
    }
    sortedTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(sortedTasks));

    const newTaskEl = Task({
      task: newTask,
      onDrop: () => {},
      onDrag: () => {},
    });
    taskElements.push(newTaskEl);
    list.append(newTaskEl);
    newTaskEl.focus();
  }
});
