const dotenv = require("dotenv");
const mongodb = require("mongodb");
const moment = require("moment");

dotenv.config();

async function initializeDb() {
  const url = process.env.DB_URL;
  const client = await mongodb.MongoClient.connect(url);
  db = client.db();
  return db;
}

function dateFromObjectId(objectId) {
  if (!objectId) {
    return null;
  }
  return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
}

module.exports.up = async function () {
  const db = await initializeDb();
  const notesWithoutDates = await db
    .collection("notes")
    .find({ date: null }, { projection: { _id: 1 } })
    .toArray();
  for (const note of notesWithoutDates) {
    const date = dateFromObjectId(String(note._id));
    const dateWithOffset = moment(date).utcOffset("-0800");
    const dateString = dateWithOffset.format("YYYY-MM-DD");
    await db
      .collection("notes")
      .updateOne({ _id: note._id }, { $set: { date: dateString } });
  }
};

module.exports.down = async function () {
  const db = await initializeDb();
  await db
    .collection("notes")
    .updateMany({ date: { $ne: null } }, { $unset: { date: 1 } });
};
