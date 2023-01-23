import { io } from 'socket.io-client';
import Peer from 'peerjs';
import { Div } from '../../../ui/components/Div';
const socket = io();

const getUserMedia =
  (navigator as any).getUserMedia ||
  (navigator as any).webkitGetUserMedia ||
  (navigator as any).mozGetUserMedia;

export function Video() {
  const roomId = window.location.pathname.split('/')[1];

  socket.emit('join-room', 'ROOM_ID', roomId);

  const myPeer = new Peer();

  myPeer.on('open', (id) => {
    // here we are sending an event to our server
    socket.emit('join-room', 'ROOM_ID', id);
  });

  socket.on('user-connected', (userId) => {
    console.log('User conncted ', userId);
  });

  const el = Div();

  const myVideo = document.createElement('video');
  myVideo.muted = true;
  const peers = {};
  getUserMedia({
    video: true,
    audio: true,
  }).then((stream) => {
    addVideoStream(myVideo, stream);

    myPeer.on('call', (call) => {
      call.answer(stream);
      const video = document.createElement('video');
      call.on('stream', (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on('user-connected', (userId) => {
      connectToNewUser(userId, stream);
    });
  });

  function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
    el.append(video);
  }

  function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream); // call and send our video stream
    const otherUserVideo = document.createElement('video');
    call.on('stream', (userVideoStream) => {
      addVideoStream(otherUserVideo, userVideoStream);
    });
    call.on('close', () => {
      otherUserVideo.remove();
    });
  }

  return el;
}
