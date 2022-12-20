import { createRoom, getRooms, onUnreadUpdate, Room } from '../apis/RoomApi';
import { getUsers } from '../apis/UserApi';
import { postUserRoomConfig, UserRoomConfig } from '../apis/UserRoomConfigApi';
import { Button } from '../components/Button';
import { Div } from '../components/Div';
import { Input } from '../components/Input';
import { Span } from '../components/Span';
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

    //Add Room Button
    const createRoomDiv = Div();
    setStyle(createRoomDiv, {
      height: "100%",
      cursor: "pointer",
      width: "30px",
      maxHeight: '45px',
      border: "1px solid black",
      margin: "10px",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "3px",
    })

    const createRoomBtn = Input();
    setStyle(createRoomBtn, {
      opacity: "0",
      cursor: "pointer",
      height: "100%",
      width: "100%",
      position: "absolute",
    });

    createRoomBtn.addEventListener('click', async (e) => {
      overlay.style.display = 'flex';
    });

    const createRoomText = Span();
    setStyle(createRoomText, {});
    createRoomText.innerHTML = "+";


    //Add room modal
    const overlay = Div();
    setStyle(overlay, {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
    });

    const createRoomModal = Div();
    setStyle(createRoomModal, {
      height: '20vh',
      width: '40vw',
      padding: '20px',
      zIndex: '1',
      backgroundColor: 'white',
    });

    const createRoomModalHeader = Div();
    setStyle(createRoomModalHeader, {
      display: 'flex',
      justifyContent: 'space-between',
    });

    const closeCreateRoomModal = Button({text: 'X'})
    closeCreateRoomModal.addEventListener('click', (e) => {
      overlay.style.display = 'none';
    })
    createRoomModalHeader.append(Div().innerText = 'Create Room');
    createRoomModalHeader.append(closeCreateRoomModal);

    setStyle(createRoomModalHeader, {
      fontSize: '30px',
      paddingBottom: '20px',
    })
    createRoomModal.appendChild(createRoomModalHeader);

    const createRoomModalNameInput = Input();
    createRoomModalNameInput.type = 'text';
    const createRoomModalLabel = Span();
    createRoomModalLabel.textContent = 'Room Name: ';

    
    createRoomModal.append(createRoomModalLabel, createRoomModalNameInput)

    const users = await getUsers();

    const AddUsersHeader = Div()
    AddUsersHeader.textContent = 'Add Users:';
    createRoomModal.appendChild(AddUsersHeader);

    const createRoomModalUserChecklist = Div()
    users.forEach((user) => {
      const checkbox = Input();
      checkbox.type = 'checkbox';
      checkbox.id = user._id;
      checkbox.name = user.name;

      const label = Span();
      label.textContent = user.name;

      createRoomModalUserChecklist.append(checkbox, label);
    })

    createRoomModal.appendChild(createRoomModalUserChecklist);

    const createRoomModalSubmitButton = Button({text: 'submit'});
    setStyle(createRoomModalSubmitButton, {
      marginLeft: '20px',
    });
    createRoomModalSubmitButton.addEventListener('click', async (e) => {
      await createRoom({name: createRoomModalNameInput.value, users: users.map((user) => user._id)});
      window.location.reload();
    });
    createRoomModal.appendChild(createRoomModalSubmitButton);

    overlay.appendChild(createRoomModal);

    createRoomDiv.appendChild(createRoomBtn);
    createRoomDiv.appendChild(createRoomText);
    
    roomListEl.append(createRoomDiv);

    el.append(roomListEl);
    el.append(overlay);
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
