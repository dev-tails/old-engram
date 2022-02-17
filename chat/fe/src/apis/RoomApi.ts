import { httpGet } from './Api';

type Room = {
  _id: string;
  name: string;
};

type GetRoomsResponse = {
  data: Room[];
};

export async function getRooms() {
  const res = await fetch("/api/rooms");
  const jsonData: GetRoomsResponse = await res.json();
  return jsonData.data;
}

export type MessageType = {
  _id: string;
  user: string;
  body: string;
  room: string;
}

export async function getRoomMessages(roomId: string) {
  return httpGet<MessageType[]>(`/api/rooms/${roomId}/messages`);
}
