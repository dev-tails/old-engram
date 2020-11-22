import express from "express";
import { ObjectId } from "../Database.js";
import { UnauthorizedError } from "../middleware/AuthMiddleware.js";
import { AuthRequiredMiddleware } from "../middleware/AuthRequiredMiddleware.js";

export function initializeZapierRouter() {
  const router = express.Router();
  router.use(AuthRequiredMiddleware);

  router.post("/subscribe", async function (req, res) {
    const { user, db, body } = req;
    const { hookUrl } = body;

    await db.collection("zapier-hooks").insertOne({
      user: ObjectId(user),
      hookUrl,
    });

    res.json();
  });

  router.post("/unsubscribe", async function (req, res) {
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
