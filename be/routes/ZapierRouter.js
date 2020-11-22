import express from "express";
import { ObjectId } from "../Database.js";
import { UnauthorizedError } from "../middleware/AuthMiddleware.js";
import { AuthAPIKeyMiddleware } from "../middleware/AuthAPIKeyMiddleware.js";
import { AuthRequiredMiddleware } from "../middleware/AuthRequiredMiddleware.js";

export function initializeZapierRouter() {
  const router = express.Router();
  router.use(AuthAPIKeyMiddleware);
  router.use(AuthRequiredMiddleware);

  router.post("/notes", async function (req, res) {
    const { user, db } = req;
    const noteBody = req.body.inputData.body;

    await db
      .collection("notes")
      .insertOne({ user: ObjectId(user), body: noteBody });

    res.json();
  });

  router.post("/hooks/subscribe", async function (req, res) {
    const { user, db, body } = req;
    const { hookUrl, type } = body;

    await db.collection("zapier-hooks").insertOne({
      user: ObjectId(user),
      hookUrl,
      type,
    });

    res.json();
  });

  router.post("/hooks/unsubscribe", async function (req, res) {
    const { user, db, body } = req;
    const { hookUrl } = body;

    const ZapierHooks = db.collection("zapier-hooks");

    const hook = await ZapierHooks.findOne({
      hookUrl,
    });

    if (!hook || String(hook.user) !== String(user)) {
      throw new UnauthorizedError();
    }

    await ZapierHooks.deleteOne({
      _id: hook._id,
    });

    res.json();
  });

  return router;
}
