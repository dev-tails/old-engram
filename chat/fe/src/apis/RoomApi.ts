type Room = {
  _id: string;
  name: string;
};

type GetRoomsResponse = {
  data: Room[];
};

export async function getRooms(): Promise<Room[]> {
  const res = await fetch("/api/rooms");
  const jsonData: GetRoomsResponse = await res.json();
  return jsonData.data;
}
