// import Peer from 'peerjs';
import { io } from 'socket.io-client';
import { Button } from '../../../ui/components/Button';
import { Div } from '../../../ui/components/Div';
import { Input } from '../../../ui/components/Input';
import { byId } from '../../../ui/utils/DomUtils';
import { v4 as uuidV4 } from 'uuid';

export function Home() {
  const roomId = window.location.pathname;
  const socket = io();

  socket.emit('join-room', 'ROOM_ID', roomId);

  socket.on('user-connected', (userId) => {
    console.log('User conncted ', userId);
  });

  const el = Div();

  const container = Div();
  const text = Div();
  text.innerText = 'Get random id';

  container.append(text);
  const myId = Input();
  myId.id = 'input-id';
  container.append(myId);

  const getIdBtn = Button({
    innerText: 'Get',
    onClick: () => {
      const input = document.getElementById('input-id');
      if (input) {
        (input as HTMLInputElement).value = uuidV4();
      }
    },
  });

  container.append(getIdBtn);
  el.append(container);

  return el;
}
