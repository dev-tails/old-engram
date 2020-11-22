import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { getEnv } from "../env.js";
import { AuthAPIKeyMiddleware } from "../middleware/AuthAPIKeyMiddleware.js";
import { AuthRequiredMiddleware } from "../middleware/AuthRequiredMiddleware.js";

async function setToken(res, user) {
  const { jwtSecret } = getEnv();
  return new Promise((resolve, reject) => {
    const expiresInSeconds = 60 * 60 * 24 * 30; // 30 days

    jwt.sign(
      {
        expiresIn: expiresInSeconds,
        user,
      },
      jwtSecret,
      function (err, token) {
        if (err) {
          return reject(err);
        }
        res.cookie("token", token, {
          maxAge: expiresInSeconds * 1000,
          secure: true,
          httpOnly: true,
          sameSite: true,
        });
        resolve();
      }
    );
  });
}

export function initializeUserRouter() {
  const router = express.Router();

  router.post("/signup", async function (req, res) {
    const { db } = req;
    const { username, password } = req.body;

    const User = db.collection("users");
    const existingUser = await User.findOne({
      username,
    });
    if (existingUser) {
      return res.status(409).json({
        errors: [new Error("username already exists")],
      });
    }

    const numberOfRounds = 10;
    const hashedPassword = await bcrypt.hash(password, numberOfRounds);

    const insertOpResult = await User.insertOne({
      username,
      hashedPassword,
    });

    await setToken(res, String(insertOpResult.insertedId));

    res.json({
      success: true,
    });
  });

  router.post("/login", async function (req, res) {
    const { db } = req;
    const { username, password } = req.body;
    const user = await db.collection("users").findOne({
      username,
    });

    if (!user) {
      return res.sendStatus(400);
    }

    let passwordsMatch = false;

    if (user.hashedPassword) {
      passwordsMatch = await bcrypt.compare(password, user.hashedPassword);
    }

    if (passwordsMatch) {
      await setToken(res, String(user._id));

      res.json({
        success: true,
      });
    } else {
      return res.sendStatus(400);
    }
  });

  router.get(
    "/me",
    AuthAPIKeyMiddleware,
    AuthRequiredMiddleware,
    async function (req, res) {
      res.json({
        user: req.user,
      });
    }
  );

  return router;
}
