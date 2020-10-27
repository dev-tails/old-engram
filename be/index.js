const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
const moment = require("moment");
const bodyParser = require("body-parser");

dotenv.config();

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;

run();

async function run() {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  console.log(`Connected to ${dbName}`);

  const app = express();
  app.use(bodyParser.json());

  app.get("/api/notes", async function (req, res) {
    const notes = await db
      .collection("notes")
      .find()
      .limit(8)
      .sort({ _id: -1 })
      .toArray();

    return res.json(notes.reverse());
  });

  app.post("/api/notes", async function (req, res) {
    const currentDateString = moment().format("YYYY-MM-DD");

    await db
      .collection("notes")
      .insertOne({ date: currentDateString, body: req.body.body });
    return res.json({ success: true });
  });

  app.listen(4000);
}
