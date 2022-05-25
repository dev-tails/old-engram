import { io } from 'socket.io-client';

import { sendNotification } from '../services/NotificationService';
import { TextUtils } from '../utils/TextUtils';
import { httpGet } from './Api';
import { getSelf, getUser } from './UserApi';
import { UserRoomConfig } from './UserRoomConfigApi';

type MessageListener = (message: MessageType) => any;
type UserRoomConfigListener = (userRoomConfig: UserRoomConfig) => any;

const messageListenerByRoomId: { [id: string]: MessageListener } = {};
const deletingMessageListener: {
  [id: string]: (messageId: string) => any;
} = {};
const editMessageListener: {
  [id: string]: MessageListener
} = {};

const roomListListenerByRoomId: { [roomId: string]: UserRoomConfigListener } = {}

export type Room = {
  _id: string;
  name: string;
  userRoomConfig?: UserRoomConfig;
};

export async function initializeRoomApi() {
  await getRooms();

  const socket = io();

  socket.on('message', (message: MessageType) => {
    const room = roomsById[message.room];
    if (!room) {
      // User doesn't have access to the room
      // TODO: make sure websocket only sends to relevant parties
      return;
    }

    const currentUser = getSelf();
    const messageSender = getUser(message.user);

    if (message.user !== currentUser._id)
      sendNotification({
        title: room.name,
        body: `${messageSender.name}: ${TextUtils.truncate(message.body, 256)}`,
        roomId: message.room,
      });

    const roomId = message.room;
    if (messagesByRoomID[roomId]) {
      messagesByRoomID[roomId].unshift(message);

      if (messageListenerByRoomId[roomId]) {
        messageListenerByRoomId[roomId](message);
      }
    }
  });

  socket.on('edited-message', (message: MessageType) => {
    editMessageListener[message.room](message);
  })

  socket.on('delete-message', ({ room, id }) => {
    deletingMessageListener[room](id);
  });

  // TODO: add socket handling for unread count update
  // TODO: redo in order to get O(1) room/roomConfig access
  socket.on('unread', (userRoomConfigs: UserRoomConfig[]) => {
    console.log(userRoomConfigs);

    const currentRoom = roomsById[userRoomConfigs[0].room];
    if (!currentRoom) {
      // User doesn't have access to the room
      // TODO: make sure websocket only sends to relevant parties
      return;
    }
    const currentUser = getSelf();

    function searchConfigForCurrentUser(userRoomConfigs, currentUser) {
      let start = 0, end = userRoomConfigs.length - 1;
      while (start <= end) {
        let mid = Math.floor((start + end) / 2);

        if (userRoomConfigs[mid].user === currentUser._id) {
          return userRoomConfigs[mid];
        } else if (userRoomConfigs[mid].user < currentUser._id) {
          start = mid + 1;
        } else {
          end = mid - 1;
        }
      }
      return 0;
    }

    const configForCurrentUser = searchConfigForCurrentUser(userRoomConfigs, currentUser);
    console.log('config for current user: ', configForCurrentUser);
    if (configForCurrentUser) {
      roomListListenerByRoomId[currentRoom._id](configForCurrentUser);
    }
  });
}

const roomsById: { [key: string]: Room } = {};

type GetRoomsResponse = {
  data: Room[];
};

export async function getRooms() {
  const res = await fetch('/api/rooms');
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
  createdAt: Date;
};

const messagesByRoomID: { [id: string]: MessageType[] } = {};

type GetRoomMessagesData = {
  messages: MessageType[];
  userRoomConfig: {
    lastReadMessageId: string;
  };
};

export async function getRoomMessages(roomId: string) {
  const data = await httpGet<GetRoomMessagesData>(
    `/api/rooms/${roomId}/messages`
  );
  messagesByRoomID[roomId] = data.messages;
  return {
    messages: messagesByRoomID[roomId],
    userRoomConfig: data.userRoomConfig,
  };
}

type GetRoomMessageByPageData = {
  messages: MessageType[];
  userRoomConfig: {
    lastReadMessageId: string;
  };
  lastMessageId: string;
}

export async function getRoomMessageByPage(roomId: string, lastMessageId: string) {
  const data = await httpGet<GetRoomMessageByPageData>(
    `/api/rooms/${roomId}/messages?lastmessageid=${lastMessageId}`
  );
  messagesByRoomID[roomId] = data.messages;

  return {
    messages: messagesByRoomID[roomId],
    userRoomConfig: data.userRoomConfig,
    lastMessageId: data.messages.length ? data.messages[data.messages.length - 1]._id : lastMessageId,
  }
}

type SendRoomMessageParams = {
  room: string;
  body: string;
};

export async function sendRoomMessage(params: SendRoomMessageParams) {
  if (!params.body) {
    return;
  }
  fetch(`/api/rooms/${params.room}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ body: params.body }),
  });
}

type DeleteRoomMessageParams = {
  id: string;
  room: string;
};

export async function deleteRoomMessage(params: DeleteRoomMessageParams) {
  fetch(`/api/rooms/${params.room}/messages`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: params.id,
    }),
  });
}

type EditRoomMessageParams = {
  room: string;
  id: string;
  body: string;
}

export async function editRoomMessage(params: EditRoomMessageParams) {
  fetch(`/api/rooms/${params.room}/messages`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: params.id,
      body: params.body,
    })
  })
}

export async function onRoomMessage(
  roomId: string,
  handler: (message: MessageType) => any
) {
  messageListenerByRoomId[roomId] = handler;
}

export function onDeleteMessage(
  roomId: string,
  handler: (messageId: string) => any
) {
  deletingMessageListener[roomId] = handler;
}

export function onEditMessage(
  roomId: string,
  handler: (message: MessageType) => any
) {
  editMessageListener[roomId] = handler;
}

export function onUnreadUpdate(
  room: Room,
  handler: (userRoomConfig: UserRoomConfig) => any
) {
  roomListListenerByRoomId[room._id] = handler;
}