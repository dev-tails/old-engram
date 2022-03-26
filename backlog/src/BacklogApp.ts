import { Div } from "../../ui/components/Div";
import { byId } from "../../ui/utils/DomUtils";
import { TaskType } from "./types/TaskType";
import { Task } from "./views/Task";

const root = byId("root");

const list = Div();

let selectedIndices = [];

let sortedTasks = [];
const tasksAsString = localStorage.getItem("tasks");
if (tasksAsString) {
  sortedTasks = JSON.parse(tasksAsString);
}

for (let i = 0; i < sortedTasks.length; i++) {
  const task = sortedTasks[i];
  addTaskView(task);
}

root.append(list);

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "c") {
    handleCreateNewTask();
  }
});

function handleCreateNewTask() {
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

function handleTaskDelete(task: TaskType) {
  if (selectedIndices.length > 1) {
    return;
  }

  sortedTasks.splice(task.order, 1);

  reorderTasks();
}

function handleBulkDelete() {
  const sortedSelectedIndices = selectedIndices.sort((a, b) => {
    return b - a;
  });
  for (const indexToRemove of sortedSelectedIndices) {
    sortedTasks.splice(indexToRemove, 1);
    list.children[indexToRemove].remove();
  }
  reorderTasks();
}

function addTaskView(task: TaskType) {
  const taskEl = Task({
    task,
    onDrag() {
      if (selectedIndices.length === 0) {
        selectedIndices.push(task.order);
      }
    },
    onDrop(taskDroppedOnto) {
      const dropIndex = taskDroppedOnto.order;
      const elementDroppedOnto = list.children[dropIndex];

      const elementsToMove = [];
      for (const selectedIndex of selectedIndices) {
        elementsToMove.push(list.children[selectedIndex]);
      }
      for (const el of elementsToMove) {
        list.insertBefore(el, elementDroppedOnto);
      }

      const movedTasks = sortedTasks.splice(
        selectedIndices[0],
        selectedIndices.length
      );
      sortedTasks.splice(dropIndex, 0, ...movedTasks);

      reorderTasks();
    },
    onSubmit: (text: string) => {
      task.body = text;
      saveTasks();
    },
    onDelete: handleTaskDelete,
    onNewTask: handleCreateNewTask,
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

let selectionBox = Div({
  styles: {
    position: "absolute",
    backgroundColor: "rgba(1, 255, 0, 0.5)",
  },
});
root.append(selectionBox);
let startMousePosition = [];
document.addEventListener("mousedown", (e) => {
  if (e.target !== list && e.target !== root) {
    return;
  }

  startMousePosition = [e.pageX, e.pageY];

  selectionBox.style.visibility = "visible";
  selectionBox.style.left = `${startMousePosition[0]}px`;
  selectionBox.style.top = `${startMousePosition[1]}px`;
  selectionBox.style.height = `0px`;
  selectionBox.style.width = `0px`;

  checkSelection();

  document.addEventListener("mousemove", handleMouseSelectionMoved);
});

function handleMouseSelectionMoved(e: MouseEvent) {
  selectionBox.style.width = `${Math.abs(e.pageX - startMousePosition[0])}px`;
  selectionBox.style.height = `${Math.abs(e.pageY - startMousePosition[1])}px`;
  if (e.pageX > startMousePosition[0]) {
    selectionBox.style.left = `${startMousePosition[0]}px`;
  } else {
    selectionBox.style.left = `${e.pageX}px`;
  }

  if (e.pageY > startMousePosition[1]) {
    selectionBox.style.top = `${startMousePosition[1]}px`;
  } else {
    selectionBox.style.top = `${e.pageY}px`;
  }

  checkSelection();
}

function checkSelection() {
  selectedIndices = [];
  for (let i = 0; i < list.children.length; i++) {
    const child = list.children[i] as HTMLElement;
    if (elementsOverlap(child, selectionBox)) {
      selectedIndices.push(i);
      child.style.backgroundColor = "rgba(0,0,0, 0.5)";
    } else {
      child.style.backgroundColor = "";
    }
  }
}

document.addEventListener("mouseup", (e) => {
  selectionBox.style.visibility = "hidden";
  document.removeEventListener("mousemove", handleMouseSelectionMoved);
});

function elementsOverlap(el1: Element, el2: Element) {
  const domRect1 = el1.getBoundingClientRect();
  const domRect2 = el2.getBoundingClientRect();

  return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left > domRect2.right
  );
}

document.addEventListener("keydown", (e) => {
  if (e.altKey && e.key === "Backspace") {
    handleBulkDelete();
  }
})