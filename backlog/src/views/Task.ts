import { Div } from "../../../ui/components/Div";
import { TaskType } from "../types/TaskType";

export type TaskProps = {
  task: TaskType;
  onDrag: () => void;
  onDrop: () => void;
};

export function Task({ task, onDrag, onDrop }: TaskProps) {
  const el = Div({
    styles: {
      position: "relative",
      border: "1px solid black",
      marginBottom: "4px",
      boxSizing: "content-box"
    },
  });
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

  const textEl = Div({
    innerText: task.body,
    styles: {
      padding: "4px",
    },
  });
  textEl.contentEditable = "true";
  el.append(textEl);

  return el;
}
