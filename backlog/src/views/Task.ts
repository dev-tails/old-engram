import { Div } from "../../../ui/components/Div";
import { TaskType } from "../types/TaskType";

export type TaskProps = {
  task: TaskType;
  onDrag: () => void;
  onDrop: () => void;
};

export function Task({ task, onDrag, onDrop }: TaskProps) {
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
    onDrag();
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
    onDrop();
  };

  return el;
}
