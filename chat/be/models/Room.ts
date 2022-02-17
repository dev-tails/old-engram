import { Document, model, Model, Schema } from "mongoose";

type RoomType =
  | {
      title: string;
    }
  | Document;

const RoomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Room: Model<RoomType> = model<RoomType>("Room", RoomSchema);
