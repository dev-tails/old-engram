const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(cookieParser());
app.use(express.json());

app.use(express.static('public'));

app.get('/:room', (req, res, next) => {
  console.log('req.params.room', req.params);
  return res.sendFile(__dirname + '/public/index.html');
});

app.get('/', (req, res) => {
  return res.sendFile(__dirname + '/public/index.html');
});

// whenever we connect to socket io we will listen for when sb joins a room and pass the room id and user id then
io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId) => {
    console.log('joining rooooom', roomId, userId);
    socket.join(roomId);

    //send message to room we are currently in
    socket.broadcast.to(roomId).emit('user-connected', userId);
    socket.on('disconnect', () => {
      socket.broadcast.to(roomId).emit('user-disconnected', userId);
    });
  });
});

server.listen(3000, () => console.log('Listening on port 3000'));
