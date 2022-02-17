const dotenv = require("dotenv");
const express = require("express");
const mongodb = require("mongodb");
const http = require("http");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");

dotenv.config();

async function run() {
  const userDatabaseClient = await mongodb.MongoClient.connect(
    process.env.USER_DB_URL
  );
  const userDb = userDatabaseClient.db();
  const User = userDb.collection("users");

  const client = await mongodb.MongoClient.connect(process.env.DB_URL);
  const db = client.db();
  const Message = db.collection("messages");
  const Room = db.collection("rooms");

  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);

  app.use(cookieParser());
  app.use(express.json());

  app.use(express.static("../fe/public"));

  app.post("/api/users/login", async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (user) {
      res.cookie("user", user._id);
      return res.sendStatus(200);
    }

    return res.sendStatus(400);
  });

  app.get("/api/rooms", async (req, res) => {
    const user = req.cookies["user"];

    const rooms = await Room.find({
      users: mongodb.ObjectId(user),
    }).toArray();
    return res.json({
      data: rooms,
    });
  });

  app.get("/api/rooms/:id/messages", async (req, res, next) => {
    const { id } = req.params;
    const messages = await Message.find({
      room: new mongodb.ObjectId(id),
    }).toArray();
    res.json({
      data: messages,
    });
  });

  app.post("/api/rooms/:id/messages", async (req, res, next) => {
    const { id } = req.params;
    await Message.insertOne({
      room: new mongodb.ObjectId(id),
      body: req.body.body,
    });

    io.emit("message", req.body.body);

    res.sendStatus(200);
  });

  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

  server.listen(1337);
}

run();
