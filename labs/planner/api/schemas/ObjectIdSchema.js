import mongodb from "mongodb";
import yup from "yup";

export class ObjectIdSchema extends yup.mixed {
  constructor() {
    super({ type: "objectId" });

    this.withMutation((schema) => {
      schema.transform(function (value) {
        if (mongodb.ObjectId.isValid(value)) {
          return new mongodb.ObjectId(value);
        } else if (value === "") {
          return null;
        } else if (!value) {
          return "";
        } else {
          throw new Error(`Invalid ObjectId ${value}`);
        }
      });
    });
  }
}
