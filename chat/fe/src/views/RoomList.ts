import { getRooms } from '../apis/RoomApi';
import { Div } from '../components/Div';
import { onClick, setStyle } from '../utils/DomUtils';
import { setURL } from '../utils/HistoryUtils';

export const RoomList = () => {
  const el = Div();
  let rooms = [];

  async function init() {
    rooms = await getRooms();

    for (const room of rooms) {
      const roomEl = Div();
      roomEl.innerText = room.name;
      roomEl.classList.add("hover:text-primary");

      setStyle(roomEl, {
        padding: "20px",
        borderBottom: "1px solid black"
      });

      onClick(roomEl, () => {
        setURL(`/rooms/${room._id}`)
      })

      el.append(roomEl);
    }
  }

  init();

  return el;
};
