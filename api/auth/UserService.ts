import { Collection, Db } from 'mongodb';

const mongodb = require("mongodb");

export type User = {
  email: string;
  password: string;
  superuser: boolean;
};

export type CheckLoginParams = {
  email: string;
  password: string;
};

export class AuthenticationError extends Error {}

export class UserService {
  private db: Db;
  private User: Collection<User>;

  async init() {
    if (this.db) {
      throw new Error("UserService has already been initialized");
    }

    const connection = await mongodb.MongoClient.connect(
      process.env.USER_DB_URL
    );

    this.db = connection.db();
    this.User = this.db.collection("users");
  }

  async findById(id: string) {
    return this.User.findOne(
      {
        _id: new mongodb.ObjectId(id),
      },
      {
        projection: {
          password: 0,
        },
      }
    );
  }

  async checkLogin(params: CheckLoginParams) {
    const userWithEmail = await this.User.findOne({ email: params.email });
    if (userWithEmail.password !== params.password) {
      throw new AuthenticationError();
    }

    return userWithEmail;
  }

  async adminFindAllUsers() {
    return this.User.find({}, { projection: { password: 0 } }).toArray();
  }
}
