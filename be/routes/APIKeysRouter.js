import express from "express";
import { AuthRequiredMiddleware } from "../middleware/AuthRequiredMiddleware.js";
import { generateAPIKey } from "../vendor/zapier/Zapier.js";

export function initializeApiKeysRouter() {
  const router = express.Router();
  router.use(AuthRequiredMiddleware);

  router.post("", async function (req, res) {
    const { user, db } = req;

    const key = generateAPIKey();

    await db.collection("keys").insertOne({
      user,
      key,
    });

    return res.json({
      key,
    });
  });

  return router;
}
