import { io } from 'socket.io-client';

import { httpGet } from './Api';

type MessageListener = (message: MessageType) => any;

const messageListenerByRoomId: { [id: string]: MessageListener } = {};

type Room = {
  _id: string;
  name: string;
};

export async function initializeRoomApi() {
  await getRooms();

  const socket = io();

  socket.on("message", (message: MessageType) => {
    const roomId = message.room;
    if (messagesByRoomID[roomId]) {
      messagesByRoomID[roomId].unshift(message);

      if (messageListenerByRoomId[roomId]) {
        messageListenerByRoomId[roomId](message);
      }
    }
  });
}

const roomsById: { [key: string]: Room } = {};

type GetRoomsResponse = {
  data: Room[];
};

export async function getRooms() {
  const res = await fetch("/api/rooms");
  const jsonData: GetRoomsResponse = await res.json();

  const rooms = jsonData.data;
  for (const room of rooms) {
    roomsById[room._id] = room;
  }

  return jsonData.data;
}

export function getRoom(roomId) {
  return roomsById[roomId];
}

export type MessageType = {
  _id: string;
  user: string;
  body: string;
  room: string;
};

const messagesByRoomID: { [id: string]: MessageType[] } = {};

export async function getRoomMessages(roomId: string) {
  const messages = await httpGet<MessageType[]>(
    `/api/rooms/${roomId}/messages`
  );
  messagesByRoomID[roomId] = messages;
  return messagesByRoomID[roomId];
}

type SendRoomMessageParams = {
  room: string;
  body: string;
};

export async function sendRoomMessage(params: SendRoomMessageParams) {
  fetch(`/api/rooms/${params.room}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body: params.body }),
  });
}

export async function onRoomMessage(
  roomId: string,
  handler: (message: MessageType) => any
) {
  messageListenerByRoomId[roomId] = handler;
}
