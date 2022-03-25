import { Div } from "../../../ui/components/Div";
import { TaskType } from "../types/TaskType";

export type TaskProps = {
  task: TaskType;
}

export function Task({ task } : TaskProps) {
  const el = Div({
    innerText: task.body,
    styles: {
      border: "1px solid black",
      padding: "4px",
      marginBottom: "4px"
    }
  });

  return el;
}