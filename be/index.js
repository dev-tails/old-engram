const express = require("express");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

dotenv.config();

const url = process.env.DB_URL;
const port = Number(process.env.PORT) || 4000;
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("Please set JWT_SECRET in .env file");
}

run();

async function run() {
  const client = await MongoClient.connect(url);
  const db = client.db();
  console.log(`Connected`);

  const app = express();
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.post("/api/login", async function (req, res) {
    const { username, password } = req.body;
    const user = await db.collection("users").findOne({
      username,
    });

    if (user && user.password === password) {
      jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
          user: String(user._id),
        },
        jwtSecret,
        function (err, token) {
          if (err) {
            return res.json({ errors: [err] });
          }
          res.cookie("token", token, { maxAge: new Date(Date.now() + (1000 * 60 * 60 * 24)) });
          res.json({
            success: true,
          });
        }
      );
    } else {
      return res.sendStatus(400);
    }
  });

  app.get("/api/notes", function (req, res) {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, async function(err, decoded) {
      if (err) {
        return res.sendStatus(400);
      }

      const { user } = decoded;

      const notes = await db
      .collection("notes")
      .find({ user: ObjectId(user), body: { $ne: "" } })
      .sort({ _id: -1 })
      .toArray();

      return res.json(notes.reverse());
    });
  });

  app.post("/api/notes", async function (req, res) {
    try {
      const insertOpResult = await db
        .collection("notes")
        .insertOne({ body: req.body.body });

      return res.json({ _id: insertOpResult.insertedId, body: req.body.body });
    } catch (err) {
      console.error(err);
      res.json({ errors: [err] });
    }
  });

  app.listen(port);
}
