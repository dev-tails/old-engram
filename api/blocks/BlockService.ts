import { Collection, Db } from 'mongodb';

const mongodb = require("mongodb");

export type Block = {
  _id: string;
  body: string;
  type: string;
  parent: string;
  fileUUID: string;
};

export type CreateBlockParams = Partial<Block>;

export class BlockService {
  private db: Db;
  private Block: Collection<Partial<Block>>;

  async init() {
    if (this.db) {
      throw new Error("BlockService has already been initialized");
    }

    const connection = await mongodb.MongoClient.connect(process.env.DB_URL);

    this.db = connection.db();
    this.Block = this.db.collection("blocks");
  }

  async getAll() {
    return this.Block.find({}).toArray();
  }

  async getAllByType(type: string) {
    return this.Block.find({ type }).toArray();
  }

  async findById(id: string) {
    return this.Block.findOne({
      _id: new mongodb.ObjectId(id),
    });
  }

  async createBlock(params: CreateBlockParams) {
    const { insertedId } = await this.Block.insertOne({
      ...params,
      ...(params.parent ? { parent: mongodb.ObjectId(params.parent) } : {})
    });

    if (params.parent) {
      await this.Block.updateOne(
        { _id: mongodb.ObjectId(params.parent) },
        { $push: { content: insertedId } }
      );
    }

    return insertedId;
  }

  async updateById(id: string, params: { body: string }) {
    return this.Block.updateOne(
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
    await this.Block.updateOne(
      { content: mongodb.ObjectId(id) },
      { $pull: { content: mongodb.ObjectId(id) } }
    );
    await this.Block.deleteMany({ parent: mongodb.ObjectId(id) });
    return this.Block.deleteOne({ _id: mongodb.ObjectId(id) });
  }
}
