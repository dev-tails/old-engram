const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(cookieParser());
app.use(express.json());

app.use(express.static('public'));

app.get('/:room', (req, res, next) => {
  return res.sendFile(__dirname + '/public/index.html');
});

app.get('/', (req, res) => {
  return res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);

    socket.broadcast.to(roomId).emit('user-connected', userId);
    socket.on('disconnect', () => {
      socket.broadcast.to(roomId).emit('user-disconnected', userId);
    });
  });
});

server.listen(3000, () => console.log('Listening on port 3000'));
