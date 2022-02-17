import { io } from 'socket.io-client';

import { getRoom, getRoomMessages, MessageType, sendRoomMessage } from '../apis/RoomApi';
import { getUser } from '../apis/UserApi';
import { Button } from '../components/Button';
import { Div } from '../components/Div';
import { Input } from '../components/Input';
import { Routes } from '../routes/Routes';
import { Borders } from '../theme/Borders';
import { onClick, setStyle, setText } from '../utils/DomUtils';
import { setURL } from '../utils/HistoryUtils';

type RoomViewProps = {
  roomId: string;
};

export function RoomView(props: RoomViewProps) {
  const roomView = Div();
  setStyle(roomView, {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    flexGrow: "1",
  });

  const room = getRoom(props.roomId);

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

  function RoomHeader() {
    const el = Div();

    setStyle(el, {
      display: "flex",
      borderBottom: Borders.bottom,
      padding: "8px",
      width: "100%",
      maxWidth: "900px",
      margin: "0 auto",
    });

    const btnBack = Button({
      text: "<",
    });
    el.append(btnBack);
    onClick(btnBack, () => {
      setURL(Routes.home);
    });

    const roomNameEl = Div();
    setStyle(roomNameEl, {
      paddingLeft: "8px",
    });
    setText(roomNameEl, room.name);

    el.append(roomNameEl);

    return el;
  }

  const roomHeader = RoomHeader();
  roomView.append(roomHeader);

  const messageList = MessageList();

  function handleSubmit(text: string) {
    sendRoomMessage({
      room: props.roomId,
      body: text,
    });
  }

  const textBox = TextBox({ onSubmit: handleSubmit });

  roomView.appendChild(messageList);
  roomView.appendChild(textBox);

  return roomView;
}
