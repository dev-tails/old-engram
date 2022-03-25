import { Div } from "../../ui/components/Div";
import { byId } from "../../ui/utils/DomUtils";
import { TaskType } from "./types/TaskType";
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
let focusedIndex = -1;

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
    onClick: handleTaskClicked,
    onBlur: handleTaskBlurred.bind(this, task),
  });
  taskElements.push(taskEl);

  list.append(taskEl);
}

root.append(list);

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "c") {
    const newIndex = sortedTasks.length;

    const newTask = {
      body: "",
      order: newIndex,
    };
    sortedTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(sortedTasks));

    const newTaskEl = Task({
      task: newTask,
      onDrop: () => {},
      onDrag: () => {},
      onClick: handleTaskClicked,
      onBlur: handleTaskBlurred.bind(this, newTask),
    });
    taskElements.push(newTaskEl);
    list.append(newTaskEl);
    newTaskEl.focus();
    focusedIndex = newIndex;
  }
  if (e.altKey && e.key == "Backspace") {
    if (focusedIndex >= 0) {
      sortedTasks.splice(focusedIndex, 1);

      for (let i = focusedIndex; i < sortedTasks.length; i++) {
        sortedTasks[i].order = i;
      }

      saveTasks();

      taskElements[focusedIndex].remove();
      focusedIndex = -1;
    }
  }
});

function handleTaskClicked(task: TaskType) {
  focusedIndex = task.order;
}

function handleTaskBlurred(task: TaskType) {
  sortedTasks[task.order].body = taskElements[task.order].innerText;
  saveTasks();
  focusedIndex = -1;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(sortedTasks));
}
