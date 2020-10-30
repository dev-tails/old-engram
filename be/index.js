const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
const moment = require("moment");
const bodyParser = require("body-parser");

dotenv.config();

const url = process.env.DB_URL;

run();

async function run() {
  const client = await MongoClient.connect(url);
  const db = client.db();
  console.log(`Connected`);

  const app = express();
  app.use(bodyParser.json());

  app.get("/api/notes", async function (req, res) {
    const notes = await db
      .collection("notes")
      .find({ body: { $ne: "" } })
      .sort({ _id: -1 })
      .toArray();

    return res.json(notes.reverse());
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

  app.listen(4000);
}
