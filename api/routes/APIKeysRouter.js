import express from "express";
import { ObjectId } from "../Database.js";
import { UnauthorizedError } from "../middleware/AuthMiddleware.js";
import { AuthRequiredMiddleware } from "../middleware/AuthRequiredMiddleware.js";
import { generateAPIKey } from "../vendor/zapier/Zapier.js";

export function initializeApiKeysRouter() {
  const router = express.Router();
  router.use(AuthRequiredMiddleware);

  router.get("", async function (req, res) {
    const { user, db } = req;

    const keys = await db
      .collection("keys")
      .find({
        user: ObjectId(user),
      })
      .toArray();

    return res.json(keys);
  });

  router.post("", async function (req, res) {
    const { user, db } = req;

    const key = generateAPIKey();

    await db.collection("keys").insertOne({
      user: ObjectId(user),
      key,
    });

    return res.json({
      key,
    });
  });

  router.delete("/:id", async function (req, res) {
    const { user, db } = req;
    const { id } = req.params;

    const key = await db.collection("keys").findOne({
      _id: ObjectId(id),
    });

    if (!key || String(key.user) !== String(user)) {
      throw new UnauthorizedError();
    }

    await db.collection("keys").deleteOne({
      _id: ObjectId(id),
    });

    return res.json({});
  });

  return router;
}
