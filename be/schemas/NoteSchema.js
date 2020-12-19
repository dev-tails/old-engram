import yup from "yup";
import { ObjectIdSchema } from "./ObjectIdSchema.js";

export default yup.object().shape({
  _id: yup.string().required(),
  body: yup.string().default(""),
  start: yup.date(),
  type: yup
    .string()
    .default("note")
    .oneOf(["note", "task", "task_complete", "event"]),
  parent: new ObjectIdSchema().default(""),
  prev: new ObjectIdSchema().default(""),
});
