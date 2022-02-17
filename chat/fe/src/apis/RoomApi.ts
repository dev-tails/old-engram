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

type GetRoomMessagesResponse = {
  data: MessageType[];
}

export async function getRoomMessages(roomId: string) {
  const res = await fetch(`/api/rooms/${roomId}/messages`);
  const jsonData: GetRoomMessagesResponse = await res.json();
  return jsonData.data;
}
