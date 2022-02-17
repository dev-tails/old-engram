import { httpGet } from './Api';

type Room = {
  _id: string;
  name: string;
};

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

export async function getRoomMessages(roomId: string) {
  return httpGet<MessageType[]>(`/api/rooms/${roomId}/messages`);
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
