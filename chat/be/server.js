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
  const UserRoomConfig = db.collection("userroomconfigs");

  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);

  app.use(cookieParser());
  app.use(express.json());

  app.use(express.static("../fe/public"));

  app.use((req, res, next) => {
    req.user = req.cookies["user"];
    next();
  });

  app.get("/api/users/self", async (req, res, next) => {
    if (req.user) {
      const user = await User.findOne(
        { _id: mongodb.ObjectId(req.user) },
        { projection: { password: 0 } }
      );
      res.json({ data: user });
    } else {
      res.sendStatus(400);
    }
  });

  app.get("/api/users", async (req, res, next) => {
    if (req.user) {
      const users = await User.find(
        {},
        { projection: { password: 0 } }
      ).toArray();
      res.json({ data: users });
    } else {
      res.sendStatus(400);
    }
  });

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
    const user = req.user;

    const rooms = await Room.find({
      users: mongodb.ObjectId(user),
    }).toArray();

    const userRoomConfigs = await UserRoomConfig.find({
      user: mongodb.ObjectId(user),
    }).toArray();

    const roomsById = {};
    for (const room of rooms) {
      roomsById[room._id] = room;
    }

    for (const userRoomConfig of userRoomConfigs) {
      if (roomsById[userRoomConfig.room]) {
        roomsById[userRoomConfig.room].userRoomConfig = userRoomConfig;
      }
    }

    return res.json({
      data: rooms,
    });
  });

  app.post("/api/userroomconfigs", async (req, res) => {
    const { _id } = req.body;
    if (_id) {
      await UserRoomConfig.updateOne(
        { _id: mongodb.ObjectId(_id) },
        {
          $set: {
            unreadCount: req.body.unreadCount,
          },
        }
      );
    } else {
      await UserRoomConfig.insertOne({
        room: mongodb.ObjectId(req.body.room),
        user: mongodb.ObjectId(req.user),
        unreadCount: req.body.unreadCount,
      });
    }
    res.sendStatus(200);
  });

  app.get("/api/rooms/:id/messages", async (req, res, next) => {
    const { id } = req.params;

    const room = await Room.findOne({
      _id: mongodb.ObjectId(id),
      users: mongodb.ObjectId(req.user),
    });
    if (!room) {
      return res.sendStatus(404);
    }

    const messages = await Message.find(
      {
        room: mongodb.ObjectId(id),
      },
      {
        sort: {
          _id: -1,
        },
      }
    )
      .map(function (msg) {
        return { ...msg, createdAt: msg._id.getTimestamp() };
      })
      .toArray();

    const userRoomConfig =
      (await UserRoomConfig.findOne({
        user: mongodb.ObjectId(req.user),
        room: mongodb.ObjectId(id),
      })) || {};

    res.json({
      data: {
        messages,
        userRoomConfig,
      },
    });
  });

  app.post("/api/rooms/:id/messages", async (req, res, next) => {
    const { id } = req.params;
    const { insertedId } = await Message.insertOne({
      room: new mongodb.ObjectId(id),
      body: req.body.body,
      user: mongodb.ObjectId(req.user),
    });

    const newMessage = await Message.findOne({ _id: insertedId });
    newMessage.createdAt = newMessage._id.getTimestamp();

    await UserRoomConfig.updateMany(
      { room: mongodb.ObjectId(id), user: { $ne: mongodb.ObjectId(req.user) } },
      { $inc: { unreadCount: 1 } }
    );

    io.emit("message", newMessage);

    res.sendStatus(200);
  });

  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

  server.listen(1337);
}

run();
