const dotenv = require("dotenv");
const express = require("express");
const mongodb = require("mongodb");
const http = require("http");
const cookieParser = require("cookie-parser");

dotenv.config();

async function run() {
  const userDatabaseClient = await mongodb.MongoClient.connect(
    process.env.USER_DB_URL
  );
  const userDb = userDatabaseClient.db();
  const User = userDb.collection("users");

  const client = await mongodb.MongoClient.connect(process.env.DB_URL);
  const db = client.db();
  const Entry = db.collection("entries");

  const app = express();
  const server = http.createServer(app);

  app.use(cookieParser());
  app.use(express.json());

  app.use(express.static("../fe/public"));

  app.use((req, res, next) => {
    req.user = req.cookies["user"];
    next();
  });

  app.get("/api/users/self", async (req, res, next) => {
    if (req.user) {
      const user = await User.findOne(
        { _id: mongodb.ObjectId(req.user) },
        { projection: { password: 0 } }
      );
      res.json({ data: user });
    } else {
      res.sendStatus(400);
    }
  });

  app.post("/api/users/login", async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (user) {
      res.cookie("user", user._id);
      return res.sendStatus(200);
    }

    return res.sendStatus(400);
  });

  app.get("/api/entries/:date", async (req, res) => {
    const { date } = req.params;

    const entry = await Entry.findOne({
      date,
    });

    res.json({ data: entry });
  });

  app.post("/api/entries/:date", async (req, res) => {
    const { date } = req.params;

    await Entry.updateOne(
      {
        date,
      },
      {
        $set: {
          body: req.body.body,
        }
      },
      {
        upsert: true,
      }
    );

    res.sendStatus(200);
  });

  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

  server.listen(1338);
}

run();
