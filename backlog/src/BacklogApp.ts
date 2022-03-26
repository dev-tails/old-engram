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

for (let i = 0; i < sortedTasks.length; i++) {
  const task = sortedTasks[i];
  addTaskView(task);
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

    const newTaskEl = addTaskView(newTask);

    newTaskEl.focus();
  }
});

function handleTaskDelete(task: TaskType) {
  sortedTasks.splice(task.order, 1);

  reorderTasks();
}

function addTaskView(task: TaskType) {
  const taskEl = Task({
    task,
    onDrag() {
      dragIndex = task.order;
    },
    onDrop(taskDroppedOnto) {
      const dropIndex = taskDroppedOnto.order;
      const elementDroppedOnto = list.children[dropIndex];
      const draggedTaskEl = list.children[dragIndex];

      const [draggedTask] = sortedTasks.splice(dragIndex, 1);
      sortedTasks.splice(dropIndex, 0, draggedTask);

      list.insertBefore(draggedTaskEl, elementDroppedOnto);

      reorderTasks();
    },
    onSubmit: (text: string) => {
      task.body = text;
      saveTasks();
    },
    onDelete: handleTaskDelete
  });

  list.append(taskEl);
  return taskEl;
}

function reorderTasks() {
  for (let i = 0; i < sortedTasks.length; i++) {
    sortedTasks[i].order = i;
  }
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(sortedTasks));
}
