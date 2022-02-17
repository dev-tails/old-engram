import { io } from 'socket.io-client';

import { getRoomMessages, MessageType } from '../apis/RoomApi';
import { Div } from '../components/Div';
import { Input } from '../components/Input';

type RoomViewProps = {
  roomId: string;
}

export function RoomView(props: RoomViewProps) {
  const roomView = Div();

  async function init() {
    const messages = await getRoomMessages(props.roomId);
    for (const message of messages) {
      const messageEl = Message(message);

      roomView.append(messageEl);
    }
  }

  init();

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

    el.innerText = props.body;

    return el;
  }

  function MessageList() {
    const el = Div({
      class: "message-list",
    });

    fetch("/api/rooms/611f1cca1def03484db6db32/messages").then(async (res) => {
      const jsonData = await res.json();
      const messages = jsonData.data;
      for (const message of messages) {
        el.appendChild(Message(message));
      }
    });

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
    fetch("/api/rooms/611f1cca1def03484db6db32/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: text }),
    }).catch((err) => {
      alert(err.message);
    });
  }

  const textBox = TextBox({ onSubmit: handleSubmit });

  roomView.appendChild(messageList);
  roomView.appendChild(textBox);

  return roomView;
}
