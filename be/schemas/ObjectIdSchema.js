import mongodb from "mongodb";
import yup from "yup";

export class ObjectIdSchema extends yup.mixed {
  constructor() {
    super({ type: "objectId" });

    this.withMutation((schema) => {
      schema.transform(function (value) {
        if (mongodb.ObjectId.isValid(value)) {
          return value;
        } else if (value === "") {
          return null;
        } else {
          throw new Error("Invalid ObjectId");
        }
      });
    });
  }
}
