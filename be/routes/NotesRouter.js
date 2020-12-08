import express from "express";
import { ObjectId } from "../Database.js";
import { AuthRequiredMiddleware } from "../middleware/AuthRequiredMiddleware.js";
import { handleNewNote } from "../vendor/zapier/Zapier.js";

export function initializeNotesRouter() {
  const router = express.Router();
  router.use(AuthRequiredMiddleware);

  router.get("", async function (req, res) {
    const { user, db } = req;

    const { count, since_id: sinceId, max_id: maxId } = req.query;

    let findOptions = {
      user: ObjectId(user),
    };
    if (sinceId && maxId) {
      findOptions._id = {
        $gt: ObjectId(sinceId),
        $lte: ObjectId(maxId),
      };
    }

    const query = db.collection("notes").find(findOptions);

    if (count) {
      query.limit(count);
    }

    const notes = await query.toArray();

    return res.json(notes.reverse());
  });

  router.put("/:id", async function (req, res) {
    const { id } = req.params;
    const { user, db } = req;
    const update = req.body;

    const Note = db.collection("notes");
    const note = await Note.findOne({
      _id: ObjectId(id),
    });

    if (!note || String(note.user) !== user) {
      throw new UnauthorizedError();
    }

    const updatedNote = await Note.updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          start: update.start,
          archived: update.archived,
          checked: update.checked,
          body: update.body,
        },
      }
    );
    return res.json(updatedNote);
  });

  router.post("", async function (req, res) {
    try {
      const { user, db } = req;

      const insertOpResult = await db.collection("notes").insertOne({
        user: ObjectId(user),
        start: req.body.start,
        body: req.body.body,
        type: req.body.type,
      });

      const newNote = await db.collection("notes").findOne({
        _id: insertOpResult.insertedId,
      });

      await handleNewNote(db, newNote, user);

      return res.json(newNote);
    } catch (err) {
      console.error(err);
      if (err instanceof UnauthorizedError) {
        res.sendStatus(401);
      } else {
        res.json({ errors: [err] });
      }
    }
  });

  router.delete("/:id", async function (req, res) {
    const { id } = req.params;
    const { user, db } = req;

    await db
      .collection("notes")
      .deleteOne({ _id: ObjectId(id), user: ObjectId(user) });

    return res.json();
  });
  return router;
}
