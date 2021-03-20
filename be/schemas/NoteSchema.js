import yup from "yup";

import { ObjectIdSchema } from "./ObjectIdSchema.js";

export default yup.object().shape({
  _id: yup.string().required(),
  date: yup.string(),
  body: yup.string().default(""),
  start: yup.date(),
  type: yup
    .string()
    .nullable()
    .default("note")
    .oneOf(["note", "task", "task_complete", "event"]),
  parent: yup.string().default(""),
  prev: yup.string().default(""),
  localId: yup.string(),
});
