import yup from "yup";
import { ObjectIdSchema } from "./ObjectIdSchema.js";

export default yup.object().shape({
  _id: yup.string().required(),
  body: yup.string().default(""),
  parent: new ObjectIdSchema().default(""),
  prev: new ObjectIdSchema().default(""),
});
