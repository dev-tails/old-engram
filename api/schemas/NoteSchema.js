import yup from 'yup';

export default yup.object().shape({
  _id: yup.string().required(),
  date: yup.string(),
  body: yup.string(),
  content: yup.string(),
  encryptedBody: yup.string(),
  iv: yup.string(),
  start: yup.date(),
  type: yup
    .string()
    .nullable()
    .default("note")
    .oneOf(["note", "task", "task_complete", "event"]),
  parent: yup.string().nullable().default(""),
  prev: yup.string().nullable().default(""),
  localId: yup.string(),
  permissions: yup.array().of(
    yup.object().shape({
      email: yup.string(),
      role: yup.string().oneOf(["r", "w"]),
    })
  ),
  createdAt: yup.date(),
  updatedAt: yup.date(),
  syncedAt: yup.date(),
});
