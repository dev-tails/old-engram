import express from "express";
import { ObjectId } from "../Database.js";
import { AuthRequiredMiddleware } from "../middleware/AuthRequiredMiddleware.js";

export function initializeWidgetsRouter() {
  const router = express.Router();
  router.use(AuthRequiredMiddleware);

  router.get("/:id", async function (req, res) {
    const { user, db } = req;
    const { id } = req.params;

    const widget = await db
      .collection("widgets")
      .findOne({ _id: ObjectId(id), user: ObjectId(user) });

    const notes = await db
      .collection("notes")
      .find({
        ...widget.filter,
        user: ObjectId(user),
      })
      .sort({ _id: -1 })
      .toArray();

    return res.json({
      widget,
      items: notes.reverse(),
    });
  });

  router.post("/:id", async function (req, res) {
    const { user, db } = req;
    const { id } = req.params;

    const widget = await db
      .collection("widgets")
      .findOne({ _id: ObjectId(id), user: ObjectId(user) });

    const insertOpResult = await db.collection("notes").insertOne({
      user: ObjectId(user),
      ...widget.filter,
      body: req.body.body,
    });

    const newNote = await db.collection("notes").findOne({
      _id: insertOpResult.insertedId,
    });

    return res.json(newNote);
  });
  return router;
}
