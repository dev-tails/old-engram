import { Button } from '../../../ui/components/Button';
import { io } from 'socket.io-client';
import Peer from 'peerjs';
const socket = io();

export function Video() {
  const roomId = window.location.pathname;

  socket.emit('join-room', 'ROOM_ID', roomId);

  const myPeer = new Peer(roomId);

  myPeer.on('open', (id) => {
    // here we are sending an event to our server
    socket.emit('join-room', 'ROOM_ID', id);
  });

  socket.on('user-connected', (userId) => {
    console.log('User conncted ', userId);
  });

  const el = Button({
    innerText: 'Call',
  });

  return el;
}
