import { getRooms, onUnreadUpdate, Room } from '../apis/RoomApi';
import { postUserRoomConfig, UserRoomConfig } from '../apis/UserRoomConfigApi';
import { Div } from '../components/Div';
import { onClick, setStyle, byId } from '../utils/DomUtils';
import { setURL } from '../utils/HistoryUtils';

export const RoomList = () => {
  const el = Div();
  setStyle(el, {
    flex: '1',
    height: 'calc(100vh - 50px)',
    borderRight: '1px solid black',
  })

  let rooms: Room[] = [];

  async function init() {
    const roomListEl = Div();
    setStyle(roomListEl, {
      display: "flex",
      flexDirection: 'column',
      overflowY: 'auto',
      height: '100%',
    })

    rooms = await getRooms();

    for (const room of rooms) {
      const roomEl = Div();

      setStyle(roomEl, {
        display: "flex",
        padding: "20px",
        borderBottom: "1px solid black",
      });

      onUnreadUpdate(room, (config: UserRoomConfig) => {
        const countToUpdate = byId(config.room);
        if (config.unreadCount > 0) {
          if (countToUpdate) {
            countToUpdate.innerHTML = String(config.unreadCount);
          } else {
            createUnreadBubble(config);
          }
        }
      });

      onClick(roomEl, async () => {
        await postUserRoomConfig({
          ...room.userRoomConfig,
          room: room._id,
          unreadCount: 0
        })
        setURL(`/rooms/${room._id}`)
      })

      const roomNameEl = Div();
      setStyle(roomNameEl, {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      });
      roomNameEl.innerText = room.name;
      roomNameEl.classList.add("hover:text-primary");

      roomEl.append(roomNameEl)

      function createUnreadBubble(config: UserRoomConfig) {
        const unreadCountEl = Div({
          class: 'unread-count',
          id: config.room,
        });
        setStyle(unreadCountEl, {
          marginLeft: "8px",
          backgroundColor: "red",
          borderRadius: "999px",
          paddingLeft: "8px",
          paddingRight: "8px",
          color: "white"
        });
        unreadCountEl.innerText = String(config.unreadCount);
        roomEl.append(unreadCountEl)
      }

      if (room.userRoomConfig?.unreadCount > 0) {
        createUnreadBubble(room.userRoomConfig);
      }
      roomListEl.appendChild(roomEl);
    }
    el.append(roomListEl);
  }

  init();

  return el;
};

export async function clearUnreadBubble(room: Room) {
  const unreadBubble = byId(room._id);
  if (unreadBubble){
    unreadBubble.remove();
    await getRooms();
  }
}
