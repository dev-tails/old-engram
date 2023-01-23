const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const server = require('http').Server(app); //useful for socket.io
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');
app.use(cookieParser());
app.use(express.json());

app.use(express.static('public'));

// create brand new room and redirect user to that page
app.get('/:room', (req, res, next) => {
  console.log('req.params.room', req.params);
  // res.render('room', { roomId: req.params.room });
  return res.sendFile(__dirname + '/public/index.html');
});

app.get('/', (req, res) => {
  console.log('sending');
  return res.sendFile(__dirname + '/public/index.html');
});

// whenever we connect to socket io we will listen for when sb joins a room and pass the room id and user id then
io.on('connection', (socket) => {
  console.log('joining rooooom');
  socket.on('join-room', (roomId, userId) => {
    console.log(roomId, userId);
    socket.join(roomId);

    //send message to room we are currently in
    socket.broadcast.to(roomId).emit('user-connected', userId);
  });
});

server.listen(3000, () => console.log('Listening on port 3000'));
