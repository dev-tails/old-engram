import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "../Database.js";
import { getEnv } from "../env.js";
import { AuthAPIKeyMiddleware } from "../middleware/AuthAPIKeyMiddleware.js";
import { AuthRequiredMiddleware } from "../middleware/AuthRequiredMiddleware.js";

async function setToken(res, user) {
  const { jwtSecret, production } = getEnv();
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
          secure: production,
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

    const user = String(insertOpResult.insertedId);

    await setToken(res, user);

    const tags = ["Note", "Task", "Event"].map((tagName) => {
      return {
        user: ObjectId(user),
        name: tagName,
      };
    });
    const { insertedIds } = await db.collection("tags").insertMany(tags);

    const widgets = ["Notes", "Tasks", "Events"].map((widgetName, index) => {
      return {
        user: ObjectId(user),
        name: widgetName,
        checkboxes: widgetName === "Tasks",
        filter: {
          tags: [ObjectId(insertedIds[index])],
        },
      };
    });
    await db.collection("widgets").insertMany(widgets);

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

  router.post("/logout", async function (req, res) {
    res.cookie("token", "", { maxAge: 0 });
    res.json({});
  });

  router.get(
    "/me",
    AuthAPIKeyMiddleware,
    AuthRequiredMiddleware,
    async function (req, res) {
      const { db, user } = req;

      const userDocument = await db.collection("users").findOne({
        _id: ObjectId(user),
      });

      res.json({
        _id: userDocument._id,
        username: userDocument.username,
      });
    }
  );

  return router;
}
