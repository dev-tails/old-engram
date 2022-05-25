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


  // TODO: make a handler function for incoming unread



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
      // TODO: onUnreadUpdate
      onUnreadUpdate(room, (config: UserRoomConfig) => {
        console.log('roomlist handler for room: ', config.room, ' called');
        const countToUpdate = byId(config.room);
        console.log(countToUpdate);
        if (countToUpdate) {
          countToUpdate.innerHTML = String(config.unreadCount);
        } else {
          createUnreadBubble(config.room);
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

      function createUnreadBubble (room: Room) {
        const unreadCountEl = Div({
          class: 'unread-count',
          id: room._id,
        });
        setStyle(unreadCountEl, {
          marginLeft: "8px",
          backgroundColor: "red",
          borderRadius: "999px",
          paddingLeft: "8px",
          paddingRight: "8px",
          color: "white"
        });
        unreadCountEl.innerText = String(room.userRoomConfig.unreadCount);
        return unreadCountEl;
      }

      // TODO: unread count bubble div
      if (room.userRoomConfig?.unreadCount > 0) {
        const unreadCountEl = createUnreadBubble(room);
        roomEl.append(unreadCountEl)
      }
      roomListEl.appendChild(roomEl);
    }
    el.append(roomListEl);
  }

  init();

  return el;
};
