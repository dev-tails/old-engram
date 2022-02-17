import { io } from 'socket.io-client';

import { getRoomMessages, MessageType, sendRoomMessage } from '../apis/RoomApi';
import { getUser } from '../apis/UserApi';
import { Div } from '../components/Div';
import { Input } from '../components/Input';
import { setStyle, setText } from '../utils/DomUtils';

type RoomViewProps = {
  roomId: string;
};

export function RoomView(props: RoomViewProps) {
  const roomView = Div();

  const socket = io();

  socket.on("message", (message) => {
    const newMessage = Message(message);
    messageList.appendChild(newMessage);
    newMessage.scrollIntoView();
  });

  function Message(props: MessageType) {
    const el = Div({
      class: "message",
    });

    async function init() {
      const userNameEl = Div();
      setStyle(userNameEl, {
        fontWeight: "bold",
      });
      const user = await getUser(props.user);
      setText(userNameEl, user.name);
      el.append(userNameEl);

      const bodyEl = Div();

      setText(bodyEl, props.body);

      el.append(bodyEl);
    }

    init();

    return el;
  }

  function MessageList() {
    const el = Div({
      class: "message-list",
    });

    async function init() {
      const messages = await getRoomMessages(props.roomId);
      for (const message of messages) {
        el.appendChild(Message(message));
      }
    }

    init();

    return el;
  }

  function TextBox(props: { onSubmit: (text: string) => void }) {
    const el = Div({
      class: "textbox",
    });

    const input = Input();

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        props.onSubmit(input.value);
        input.value = "";
      }
    });

    el.appendChild(input);

    return el;
  }

  const messageList = MessageList();

  function handleSubmit(text: string) {
    sendRoomMessage({
      room: props.roomId,
      body: text
    })
  }

  const textBox = TextBox({ onSubmit: handleSubmit });

  roomView.appendChild(messageList);
  roomView.appendChild(textBox);

  return roomView;
}
