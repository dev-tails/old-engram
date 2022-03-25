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
      padding: "4px",
      marginBottom: "4px",
    },
  });
  el.draggable = true;
  el.ondrag = () => {
    onDrag();
  };

  const aboveEl = Div({
    styles: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "50%",
      borderTop: "4px solid black",
      borderColor: "rgba(0, 0, 0, 0)",
    },
  });

  aboveEl.ondragover = (e) => {
    e.preventDefault();
    aboveEl.style.borderColor = "rgba(0, 0, 0, 1)";
  };

  aboveEl.ondragleave = (e) => {
    aboveEl.style.borderColor = "rgba(0, 0, 0, 0)";
  };

  aboveEl.ondrop = (e) => {
    onDrop();
  };
  el.append(aboveEl);

  return el;
}
