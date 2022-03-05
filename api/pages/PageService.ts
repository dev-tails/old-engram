import { Collection, Db } from "mongodb";

const mongodb = require("mongodb");

export type Page = {
  _id: string;
  user: string;
  body: string;
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

  async getForUser(user: string) {
    return this.Page.find({
      user: mongodb.ObjectId(user)
    }).toArray();
  }

  async findById(id: string) {
    return this.Page.findOne({
      _id: new mongodb.ObjectId(id),
    });
  }

  async createPage(params: CreatePageParams) {
    return this.Page.insertOne({
      user: mongodb.ObjectId(params.user),
      body: params.body
    });
  }
}
