import { Collection, Db } from 'mongodb';

const mongodb = require("mongodb");

export type Room = {
  name: string;
};

export type CreateRoomParams = Partial<Room>;

export class RoomService {
  private db: Db;
  private Room: Collection<Partial<Room>>;

  async init() {
    if (this.db) {
      throw new Error("RoomService has already been initialized");
    }

    const connection = await mongodb.MongoClient.connect(
      process.env.CHAT_DB_URL
    );

    this.db = connection.db();
    this.Room = this.db.collection("rooms");
  }

  async findById(id: string) {
    return this.Room.findOne({
      _id: new mongodb.ObjectId(id),
    });
  }

  async adminFindAll() {
    return this.Room.find({}).toArray();
  }

  async create(params: CreateRoomParams) {
    return this.Room.insertOne(params);
  }
}
