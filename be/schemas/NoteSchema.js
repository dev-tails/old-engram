import yup from "yup";

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
  parent: yup.string().nullable().default(""),
  prev: yup.string().nullable().default(""),
  localId: yup.string(),
  createdAt: yup.date(),
  updatedAt: yup.date(),
  syncedAt: yup.date(),
});
