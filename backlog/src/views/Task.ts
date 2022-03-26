import { Div } from "../../../ui/components/Div";
import { TaskType } from "../types/TaskType";

export type TaskProps = {
  task: TaskType;
  onDrag?: (task: TaskType) => void;
  onDrop?: (task: TaskType) => void;
  onFocus?: (task: TaskType) => void;
  onBlur?: (task: TaskType) => void;
  onSubmit?: (body: string) => void;
};

export function Task({
  task,
  onFocus,
  onDrag,
  onDrop,
  onBlur,
  onSubmit,
}: TaskProps) {
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
    onFocus(task);

    el.addEventListener("keydown", handleKeyDown);
  };

  el.onblur = () => {
    onBlur(task);
    checkSubmit();
    el.removeEventListener("keydown", handleKeyDown);
  };

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      checkSubmit();
    }
  }

  function checkSubmit() {
    if (task.body !== el.innerText) {
      onSubmit(el.innerText);
    }
  }

  return el;
}
