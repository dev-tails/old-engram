import { Collection, Db } from 'mongodb';

const mongodb = require("mongodb");

export type Page = {
  _id: string;
  body: string;
  type: string;
  parent: string;
  fileUUID: string;
};

export type CreatePageParams = Partial<Page>;

export class PageService {
  private db: Db;
  private Page: Collection<Partial<Page>>;

  async init() {
    if (this.db) {
      throw new Error("PageService has already been initialized");
    }

    const connection = await mongodb.MongoClient.connect(process.env.DB_URL);

    this.db = connection.db();
    this.Page = this.db.collection("pages");
  }

  async getAll() {
    return this.Page.find({}).toArray();
  }

  async findById(id: string) {
    return this.Page.findOne({
      _id: new mongodb.ObjectId(id),
    });
  }

  async createPage(params: CreatePageParams) {
    const { insertedId } = await this.Page.insertOne({
      ...params,
      ...(params.parent ? { parent: mongodb.ObjectId(params.parent) } : {})
    });

    if (params.parent) {
      await this.Page.updateOne(
        { _id: mongodb.ObjectId(params.parent) },
        { $push: { content: insertedId } }
      );
    }

    return insertedId;
  }

  async updateById(id: string, params: { body: string }) {
    return this.Page.updateOne(
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
    await this.Page.updateOne(
      { content: mongodb.ObjectId(id) },
      { $pull: { content: mongodb.ObjectId(id) } }
    );
    await this.Page.deleteMany({ parent: mongodb.ObjectId(id) });
    return this.Page.deleteOne({ _id: mongodb.ObjectId(id) });
  }
}
