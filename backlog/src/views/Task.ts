import { Div } from "../../../ui/components/Div";
import { TaskType } from "../types/TaskType";

export type TaskProps = {
  task: TaskType;
  onDrag?: (task: TaskType) => void;
  onDrop?: (task: TaskType) => void;
  onSubmit?: (body: string) => void;
  onDelete?: (task: TaskType) => void;
  onNewTask?: () => void;
};

export function Task({ task, onDrag, onDrop, onSubmit, onDelete, onNewTask }: TaskProps) {
  const el = Div({
    innerText: task.body,
    styles: {
      position: "relative",
      border: "1px solid black",
      marginBottom: "4px",
      padding: "4px",
    },
  });
  el.contentEditable = "true";
  el.draggable = true;
  el.ondrag = () => {
    onDrag(task);
  };

  el.ondragover = (e) => {
    el.style.borderColor = "red";
    e.preventDefault();
  };

  el.ondragleave = (e) => {
    el.style.borderColor = "black";
  };

  el.ondrop = (e) => {
    el.style.borderColor = "black";
    onDrop(task);
  };

  el.onfocus = () => {
    el.addEventListener("keydown", handleKeyDown);
  };

  el.onblur = () => {
    checkSubmit();
    el.removeEventListener("keydown", handleKeyDown);
  };

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      checkSubmit();
      e.preventDefault();
      el.blur();
      onNewTask();
    }
    if (e.key === "Backspace" && (el.innerText.length === 0 || e.altKey)) {
      handleDelete();
    }
  }

  function handleDelete() {
    el.onblur = null;
    el.remove();
    onDelete(task);
  }

  function checkSubmit() {
    if (task.body !== el.innerText) {
      onSubmit(el.innerText);
      return true;
    }
    return false;
  }

  return el;
}
