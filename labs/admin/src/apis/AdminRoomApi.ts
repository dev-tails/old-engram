export type Room = {
  name: string;
};

export async function postCreateUser(user: Partial<Room>) {
  const res = await fetch("/api/admin/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const jsonData = await res.json();
  return jsonData.data;
}

export async function fetchRooms() {
  const res = await fetch("/api/admin/rooms");
  const jsonData = await res.json();
  return jsonData.data;
}
