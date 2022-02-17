import { Document, model, Model, Schema } from "mongoose";

type MessageType =
  | {
      room: Schema.Types.ObjectId;
      body: string;
    }
  | Document;

const MessageSchema = new Schema(
  {
    room: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Message: Model<MessageType> = model<MessageType>("Message", MessageSchema);
