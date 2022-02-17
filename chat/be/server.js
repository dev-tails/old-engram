const dotenv = require("dotenv");
const express = require("express");
const mongodb = require("mongodb");
const http = require('http');
const { Server } = require("socket.io");

dotenv.config();

async function run() {
    const client = await mongodb.MongoClient.connect(process.env.DB_URL);
    const db = client.db();
    const Message = db.collection("messages");

    const app = express();
    const server = http.createServer(app);
    const io = new Server(server);

    app.use(express.json());

    app.use(express.static("../fe/public"));

    app.get("/api/rooms/:id/messages", async (req, res, next) => {
        const { id } = req.params;
        const messages = await Message.find({
            room: new mongodb.ObjectId(id)
        }).toArray();
        res.json({
            data: messages
        })
    });

    app.post("/api/rooms/:id/messages", async (req, res, next) => {
        const { id } = req.params;
        await Message.insertOne({
            room: new mongodb.ObjectId(id),
            body: req.body.body
        });

        io.emit("message", req.body.body);

        res.sendStatus(200);
    });

    server.listen(1337);
}

run();