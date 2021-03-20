import express from "express";
import yup from "yup";

import { ObjectId } from "../Database.js";
import { UnauthorizedError } from "../middleware/AuthMiddleware.js";
import { AuthRequiredMiddleware } from "../middleware/AuthRequiredMiddleware.js";
import NoteSchema from "../schemas/NoteSchema.js";
import { ObjectIdSchema } from "../schemas/ObjectIdSchema.js";
import { handleNewNote } from "../vendor/zapier/Zapier.js";

export function initializeNotesRouter() {
  const router = express.Router();
  router.use(AuthRequiredMiddleware);

  router.get("", async function (req, res) {
    const { user, db } = req;

    const querySchema = yup.object().shape({
      count: yup.number(),
      type: yup.string().nullable(),
      before: yup.date(),
      since: yup.date(),
      sort: yup.string().oneOf(["start"]),
      lastSyncDate: yup.date().nullable(),
    });
    const parsedQuery = querySchema.cast(req.query);

    const { count, since, before, type, sort, lastSyncDate } = parsedQuery;

    let findOptions = {
      user: ObjectId(user),
    };

    if (since && before) {
      findOptions.start = {
        $gte: since,
        $lte: before,
      };
    } else if (since) {
      findOptions.start = {
        $gte: since,
      };
    } else if (before) {
      findOptions.start = {
        $lte: before,
      };
    }

    if (type) {
      if (type !== "task") {
        findOptions.type = type;
      } else {
        findOptions.type = {
          $in: ["task", "task_completed"],
        };
      }
    }

    if (lastSyncDate) {
      findOptions.syncedAt = {
        $gt: lastSyncDate,
      };
    }

    const query = db.collection("notes").find(findOptions);

    if (count) {
      query.limit(count);
    }

    if (sort) {
      query.sort({
        [sort]: 1,
      });
    }

    const notes = await query.toArray();

    const notesSchema = yup.array().of(NoteSchema);

    const notesToReturn = notesSchema.cast(notes, { stripUnknown: true });

    return res.json(notesToReturn);
  });

  router.get("/:id", async function (req, res) {
    const { user, db } = req;

    const topLevelNote = await db.collection("notes").findOne({
      _id: ObjectId(req.params.id),
    });

    function userHasAccessToNote(note, user) {
      if (note?.shareSettings?.public?.view) {
        return true;
      }

      return String(note.user) === String(user);
    }

    if (!userHasAccessToNote(topLevelNote, user)) {
      throw new UnauthorizedError();
    }

    let notesToReturn = [topLevelNote];

    let depth = 1;
    const maxDepth = 10;
    let parentIds = [ObjectId(req.params.id)];
    do {
      const childrenNotes = await db
        .collection("notes")
        .find({
          parent: {
            $in: parentIds,
          },
        })
        .toArray();

      parentIds = childrenNotes.map((childNote) => childNote._id);

      notesToReturn = [...notesToReturn, ...childrenNotes];
      depth++;
    } while (parentIds.length > 0 && depth < maxDepth);

    return res.json(notesToReturn);
  });

  router.put("/:id", async function (req, res) {
    const { id } = req.params;
    const { user, db } = req;

    const bodySchema = yup.object().shape({
      start: yup.date(),
      body: yup.string(),
      type: yup.string().default("note"),
      parent: new ObjectIdSchema(),
      prev: new ObjectIdSchema(),
      archived: yup.boolean(),
      checked: yup.boolean(),
      localId: yup.string(),
      createdAt: yup.date(),
      updatedAt: yup.date(),
    });

    const update = await bodySchema.validate(req.body, { stripUnknown: true });

    const Note = db.collection("notes");
    const note = await Note.findOne({
      _id: ObjectId(id),
    });

    if (!note || String(note.user) !== user) {
      throw new UnauthorizedError();
    }

    const updateResultOp = await Note.updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          ...update,
          syncedAt: new Date(),
        },
      }
    );

    const updatedNote = await db.collection("notes").findOne({
      _id: ObjectId(id),
    });

    return res.json(updatedNote);
  });

  router.post("", async function (req, res) {
    const bodySchema = yup.object().shape({
      start: yup.date(),
      date: yup.string(),
      body: yup.string().default(""),
      type: yup.string().default("note"),
      parent: new ObjectIdSchema(),
      prev: new ObjectIdSchema(),
      localId: yup.string(),
      createdAt: yup.date(),
      updatedAt: yup.date(),
    });

    const noteToCreate = await bodySchema.validate(req.body, {
      stripUnknown: true,
    });

    const { user, db } = req;

    const insertOpResult = await db.collection("notes").insertOne({
      user: ObjectId(user),
      ...noteToCreate,
      syncedAt: new Date(),
    });

    const newNote = await db.collection("notes").findOne({
      _id: insertOpResult.insertedId,
    });

    await handleNewNote(db, newNote, user);

    return res.json(newNote);
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
