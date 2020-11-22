import express from "express";
import mongodb from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import {
  AuthMiddleware,
  UnauthorizedError,
  getDecodedToken,
} from "./middleware/AuthMiddleware.js";
import { getEnv } from "./env.js";
import { initializeUserRouter } from "./routes/UsersRouter.js";

const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

const { origin, url, port, jwtSecret } = getEnv();

run();

async function setToken(res, user) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        user,
      },
      jwtSecret,
      function (err, token) {
        if (err) {
          return reject(err);
        }
        res.cookie("token", token, {
          maxAge: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        });
        resolve();
      }
    );
  });
}

async function run() {
  const client = await MongoClient.connect(url);
  const db = client.db();
  console.log(`Connected`);

  const app = express();

  if (app.get("env") === "production") {
    app.set("trust proxy", 1); // trust first proxy
  }

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(AuthMiddleware);

  const apiRouter = express.Router();

  app.use("/api", apiRouter);
  apiRouter.use("/users", initializeUserRouter());

  app.get("/api/notes", async function (req, res) {
    const { user } = await getDecodedToken(req.cookies.token);

    const notes = await db
      .collection("notes")
      .find({ user: ObjectId(user), body: { $ne: "" } })
      .sort({ _id: -1 })
      .toArray();

    return res.json(notes.reverse());
  });

  app.put("/api/notes/:id", async function (req, res) {
    const { id } = req.params;
    const { user } = await getDecodedToken(req.cookies.token);
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
          checked: update.checked,
        },
      }
    );
    return res.json(updatedNote);
  });

  app.post("/api/notes", async function (req, res) {
    try {
      const { user } = await getDecodedToken(req.cookies.token);

      const insertOpResult = await db
        .collection("notes")
        .insertOne({ user: ObjectId(user), body: req.body.body });

      const newNote = await db.collection("notes").findOne({
        _id: insertOpResult.insertedId,
      });

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

  app.delete("/api/notes/:id", async function (req, res) {
    const { id } = req.params;
    const { user } = await getDecodedToken(req.cookies.token);

    await db
      .collection("notes")
      .deleteOne({ _id: ObjectId(id), user: ObjectId(user) });

    return res.json();
  });

  app.get("/api/widgets/:id", async function (req, res) {
    const { user } = await getDecodedToken(req.cookies.token);
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

  app.post("/api/widgets/:id", async function (req, res) {
    const { user } = await getDecodedToken(req.cookies.token);
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

  app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      res.clearCookie("token");
      return res.sendStatus(401);
    }
    console.error(err);
    res.status(500).json({ errors: [err] });
  });

  app.listen(port);
}
