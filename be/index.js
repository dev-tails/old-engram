const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
dotenv.config();

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;

run();

async function run() {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  console.log(`Connected to ${dbName}`);

  const app = express();

  app.get("/", function (req, res) {
    res.send("Hello World");
  });

  app.listen(3000);
}
