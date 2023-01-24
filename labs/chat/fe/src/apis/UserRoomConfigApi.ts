export type UserRoomConfig = {
  _id: string;
  user: string;
  room: string;
  unreadCount: number;
};

export function postUserRoomConfig(userRoomConfig: Partial<UserRoomConfig>) {
  fetch("/api/userroomconfigs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userRoomConfig),
  });
}
