import { Collection, Db } from 'mongodb';

const mongodb = require("mongodb");

export type File = {
  _id: string;
  name: string;
  mimetype: string;
  encoding: string;
  originalname: string;
};

export type CreateFileParams = Partial<File>;

export class FileService {
  private db: Db;
  private File: Collection<Partial<File>>;

  async init() {
    if (this.db) {
      throw new Error("FileService has already been initialized");
    }

    const connection = await mongodb.MongoClient.connect(process.env.DB_URL);

    this.db = connection.db();
    this.File = this.db.collection("files");
  }

  async getAll() {
    return this.File.find({}).toArray();
  }

  async findById(id: string) {
    return this.File.findOne({
      _id: new mongodb.ObjectId(id),
    });
  }

  async insertMany(params: CreateFileParams[]) {
    return this.File.insertMany(params);
  }

  async updateById(id: string, params: { name: string }) {
    return this.File.updateOne(
      {
        _id: mongodb.ObjectId(id),
      },
      {
        $set: {
          ...params,
        },
      }
    );
  }

  async removeById(id: string) {
    return this.File.deleteOne({ _id: mongodb.ObjectId(id) });
  }
}
