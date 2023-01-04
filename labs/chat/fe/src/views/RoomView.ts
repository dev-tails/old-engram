import autolinker from 'autolinker';

import {
  getRoom,
  getRoomMessages,
  MessageType,
  onRoomMessage,
  sendRoomMessage,
  deleteRoomMessage,
  onDeleteMessage,
  editRoomMessage,
  onEditMessage,
  getRoomMessageByPage,
} from '../apis/RoomApi';

import { postUserRoomConfig } from '../apis/UserRoomConfigApi';

import { clearUnreadBubble, RoomList } from './RoomList';

import { getSelf, getUser } from '../apis/UserApi';
import { Button } from '../components/Button';
import { Div } from '../components/Div';
import { Span } from '../components/Span';
import { Input } from '../components/Input';
import { TextArea } from '../components/TextArea'
import { Routes } from '../routes/Routes';
import { Borders } from '../theme/Borders';
import {
  bottomPosition,
  byId,
  bySelector,
  onClick,
  onMouseLeave,
  onMouseOver,
  setStyle,
  setText,
} from '../utils/DomUtils';
import { setURL } from '../utils/HistoryUtils';
import { sendFile } from '../apis/FileUploadApi';
import { emojiList } from '../theme/Emojis'

type RoomViewProps = {
  roomId: string;
};

let sideBarEnabled = false;
const isMobile = window.innerWidth <= 768 ? true : false

export function RoomView(props: RoomViewProps) {
  let messages: MessageType[] = [];
  let userRoomConfig: {
    lastReadMessageId: string;
  } = null;
  let lastMessageId = '';

  let messageButtonActive = false;
  let messageBeingEdited = false;

  const mql = window.matchMedia('(max-width: 600px');
  sideBarEnabled = localStorage.getItem('sidebar') === 'true';


  const roomView = Div({
    class: 'room-view',
  });
  setStyle(roomView, {
    display: 'flex',
    flexGrow: '1',
    width: '100%',
  })


  const messageView = Div({
    class: 'message-view',
  });

  setStyle(messageView, {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 50px)',
    width: '100%',
    flexGrow: '1',
    minWidth: '0',
  });

  const room = getRoom(props.roomId);

  onClick(messageView, async () => {
    await postUserRoomConfig({
      ...room.userRoomConfig,
      room: room._id,
      unreadCount: 0
    })
    await clearUnreadBubble(room);
  })

  onRoomMessage(props.roomId, (message) => {
    if (isLastMessageToday(messages[1], message)) {
      messageList.prepend(DateDivider(message.createdAt));
    }
    const newMessage = Message(message);
    messageList.prepend(newMessage);
  });

  onDeleteMessage(props.roomId, async (messageId) => {
    const messageToDelete = byId(messageId);
    messageToDelete.remove();
    const isLastMessageInList =
      messageList.firstElementChild.classList.contains('date-divider');

    if (isLastMessageInList) {
      messageList.removeChild(messageList.firstChild);
      const messagesList = await getRoomMessageByPage(props.roomId, '');
      messages = messagesList.messages;
    }
  });

  onEditMessage(props.roomId, async (message) => {
    const messageToEdit = byId(message._id);
    const messageContentEl = messageToEdit.getElementsByClassName('message-content-el')[0];
    const messageBody = messageToEdit.getElementsByClassName('body')[0]
    messageBody.innerHTML = autolinker.link(message.body);

    if (!messageToEdit.getElementsByClassName('edited-tag')[0]) {
      const editedTag = EditedTag();
      messageContentEl.insertBefore(editedTag, messageBody);
    }
  });

  function Message(props: MessageType) {
    let dropdownOpen = false;

    const el = Div({
      class: 'message',
      id: props._id,
    });

    setStyle(el, {
      display: 'flex',
      margin: '0px 0px',
      overflowWrap: 'Anywhere',
      padding: '4px 15px',
    });

    onMouseOver(el, (e) => {
      e.stopPropagation();
      if (messageButtonActive) {
        return;
      }
      if (!el.classList.contains('being-edited')) {
        el.style.backgroundColor = '#f2f2f2';
        const optionsButton = bySelector(el.lastElementChild, '.options-button');
        if (optionsButton && !messageBeingEdited) {
          optionsButton.style.display = 'block';
        }
      }

    });

    onMouseLeave(el, (e) => {
      e.stopPropagation();
      if (messageButtonActive) {
        return;
      }
      if (!el.classList.contains('being-edited')) {
        el.style.backgroundColor = '';
        const optionsButton = bySelector(el.lastElementChild, '.options-button');
        if (optionsButton && !messageBeingEdited) {
          optionsButton.style.display = dropdownOpen ? 'block' : 'none';
        }
      }

    });

    const user = getUser(props.user);

    const userIcon = Div();
    setStyle(userIcon, {
      display: 'flex',
      flexShrink: '0',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      borderRadius: '999px',
      height: '30px',
      width: '30px',
      backgroundColor: user.color || 'black',
      color: 'white',
      textAlign: 'center',
      lineHeight: '30px',
      marginRight: '10px',
      fontSize: '12px',
    });

    const firstInitial = user.name.charAt(0);
    const lastInitial = user.name.split(' ')[1].charAt(0);

    userIcon.innerText = firstInitial + lastInitial;
    el.append(userIcon);

    const messageContentEl = Div({
      class: 'message-content-el',
    });
    setStyle(messageContentEl, {
      width: '100%',
    });
    el.append(messageContentEl);

    async function init() {
      const userNameEl = Span();
      setStyle(userNameEl, {
        fontWeight: 'bold',
      });

      setText(userNameEl, user.name);
      messageContentEl.append(userNameEl);

      const messageTime = Span();
      setStyle(messageTime, {
        marginLeft: '8px',
        fontSize: '12px',
      });

      const messageCreatedAt = new Date(props.createdAt).toLocaleTimeString(
        'en',
        { hour: 'numeric', minute: '2-digit' }
      );

      messageTime.innerHTML = messageCreatedAt;
      messageContentEl.append(messageTime);

      if (props.updatedAt) {
        messageContentEl.append(EditedTag());
      }

      const bodyEl = Div();
      bodyEl.className = 'body';
      setStyle(bodyEl, {
        position: 'relative',
        whiteSpace: 'pre-wrap',
      });

      if (props.body) {
        bodyEl.innerHTML = autolinker.link(props.body);
      } else {

        function isImage(url) {
          return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
        }

        if (props.file) {
          if (isImage(props.file.url)) {
            const image = document.createElement("img");
            image.src = "/" + props.file.url;
            setStyle(image, {
              maxWidth: "300px",
              maxHeight: "300px",
              cursor: "pointer"
            })
            image.addEventListener('click', () => {
              window.open("/" + props.file?.url);
            })
            bodyEl.append(image);
          } else {
            const downloadLink = document.createElement("a");
            downloadLink.download = props.file.filename;
            downloadLink.href = "/" + props.file.url;
            downloadLink.innerHTML = props.file.filename;
            bodyEl.append(downloadLink);
          }
        }

      }


      const currentUser = getSelf();
      if (props.user === currentUser._id) {
        const messageOptions = Div({
          class: 'options-button',
        });
        setStyle(messageOptions, {
          position: 'absolute',
          top: '-18px',
          right: '0px',
          display: 'none',
          cursor: 'pointer',
          width: '24px',
          height: '12px',
          paddingBottom: '10px',
          textAlign: 'center',
          fontSize: '14px',
          border: '1px solid #909090bf',
          backgroundColor: '#f2f2f2',
          color: '#909090',
          borderRadius: '2px',
        });

        messageOptions.innerHTML = '&#8230';
        bodyEl.append(messageOptions);

        onMouseOver(messageOptions, () => {
          messageOptions.style.borderColor = '#909090';
        });
        onMouseLeave(messageOptions, () => {
          messageOptions.style.borderColor = '#909090bf';
        });

        onClick(messageOptions, () => {
          dropdownOpen = !dropdownOpen;
          messageButtonActive = !messageButtonActive;

          const element = byId(props._id);
          const optionsButton = bySelector(element, '.options-button');

          if (bottomPosition(optionsButton) > window.innerHeight - 100) {
            dropdown.style.top = '-38px';
            dropdown.style.zIndex = '1';
          }
          dropdown.style.display = dropdownOpen ? 'block' : 'none';
        });

        const dropdown = Div();
        setStyle(dropdown, {
          display: 'none',
          position: 'absolute',
          top: '24px',
          right: '0',
          cursor: 'pointer',
          border: '1px solid #909090',
          color: '#333',
          backgroundColor: '#fff',
          borderRadius: '2px',
        });

        const options = document.createElement('ul');
        setStyle(options, {
          listStyleType: 'none',
          padding: '0px',
          margin: '0px',
        });

        const delete_option = document.createElement('li');
        setStyle(delete_option, {
          margin: '0',
          padding: '8px 12px',
          overflowWrap: 'Normal',
        });
        delete_option.innerHTML = 'Delete';


        const edit_option = document.createElement('li');
        setStyle(edit_option, {
          margin: '0',
          padding: '8px 12px',
          overflowWrap: 'Normal',
        });
        edit_option.innerHTML = 'Edit';

        options.appendChild(delete_option);
        options.appendChild(edit_option);

        onClick(delete_option, () => {
          handleDeleteMessage(props._id);
          messageButtonActive = false;
        });

        onMouseOver(delete_option, () => {
          delete_option.style.backgroundColor = '#f2f2f2';
          dropdown.style.border = '1px solid #909090';
        });

        onMouseLeave(delete_option, () => {
          delete_option.style.backgroundColor = '';
          dropdown.style.border = '1px solid #909090bf';
        });

        onClick(edit_option, () => {
          const textBox = byId('textbox');
          if (textBox) {
            textBox.remove();
          }
          const messageId = props._id;
          const editTextBox = TextBox({ onSubmit: handleEditMessage, messageId });
          messageView.append(editTextBox);

          const editTextInput = <HTMLInputElement>byId('textinput');
          const messageBodyEnd = props.body.length;
          editTextInput.placeholder = 'Edit your message';
          editTextInput.innerHTML = props.body;
          editTextInput.setSelectionRange(messageBodyEnd, messageBodyEnd);
          editTextInput.focus();

          el.classList.toggle('being-edited');
          el.style.backgroundColor = '#e6e6e6';
          messageOptions.style.display = 'none';

          messageButtonActive = false;
          messageBeingEdited = true;
        });

        onMouseOver(edit_option, () => {
          edit_option.style.backgroundColor = '#f2f2f2';
          dropdown.style.border = '1px solid #909090';
        });

        onMouseLeave(edit_option, () => {
          edit_option.style.backgroundColor = '';
          dropdown.style.border = '1px solid #909090bf';
        });

        function handleClickOutsideDropdown(e) {
          e.stopPropagation();
          const element = byId(props._id);
          if (
            dropdownOpen &&
            !bySelector(element, '.options-button').contains(
              e.target as Element
            )
          ) {
            dropdownOpen = !dropdownOpen;
            messageButtonActive = false;
            dropdown.style.display = 'none';
            messageOptions.style.display = 'none';
            el.style.backgroundColor = '';
          }
        }

        window.addEventListener('click', handleClickOutsideDropdown);

        dropdown.append(options);
        messageOptions.append(dropdown);
      }
      messageContentEl.append(bodyEl);
    }

    init();

    return el;
  }

  function EditedTag() {
    const el = Span({
      class: 'edited-tag'
    });
    setStyle(el, {
      marginLeft: '8px',
      fontSize: '12px',
    })
    el.innerHTML = 'edited';

    return el
  }

  function MessageList() {
    const el = Div({
      class: 'message-list',
    });

    setStyle(el, {
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column-reverse',
      margin: '0',
      width: '100%',

    });

    async function init() {

      const loadMoreDiv = Div();
      setStyle(loadMoreDiv, {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      })

      const loadMoreButton = Button({
        text: 'Load More Messages'
      });
      setStyle(loadMoreButton, {
        width: '200px',
      })

      async function messagePage(lastMessageIdParam: string) {
        const messagesList = await getRoomMessageByPage(props.roomId, lastMessageIdParam);
        messages = messagesList.messages;
        userRoomConfig = messagesList.userRoomConfig
        lastMessageId = messagesList.lastMessageId;

        for (let i = 0; i < messages.length; i++) {
          if (messages[i]._id === userRoomConfig.lastReadMessageId) {
            el.append(NewRow());
          }
          el.appendChild(Message(messages[i]));

          const message = new Date(messages[i].createdAt).toLocaleDateString();
          const nextMessage = messages[i + 1]
            ? new Date(messages[i + 1].createdAt).toLocaleDateString()
            : null;

          if (message !== nextMessage) {
            el.append(DateDivider(messages[i].createdAt));
          }
        }
        el.appendChild(loadMoreDiv);
        loadMoreDiv.appendChild(loadMoreButton);
      }
      await messagePage(lastMessageId);

      onClick(loadMoreButton, async () => {
        await messagePage(lastMessageId);
        el.scrollTo(0, (el.scrollHeight * -1));
      })
    }

    init();

    return el;
  }

  function NewRow() {
    const el = Div();
    setStyle(el, {
      borderBottom: '1px solid red',
    });
    return el;
  }

  function DateDivider(dividerDate: Date) {
    const messagesDate = Div({
      class: 'date-divider',
    });
    setStyle(messagesDate, {
      display: 'flex',
      position: 'relative',
    });

    const dateBox = Div();
    setStyle(dateBox, {
      background: '#fff',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: '8px',
      fontSize: '12px',
      zIndex: '1',
    });

    dateBox.innerHTML = new Date(dividerDate).toLocaleDateString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    messagesDate.append(dateBox);

    const messagesDateHr = Div();
    setStyle(messagesDateHr, {
      position: 'absolute',
      bottom: '50%',
      width: '100%',
      border: 'none',
      borderTop: '1px solid #ddd',
      opacity: '0.5',
      boxSizing: 'border-box',
    });

    messagesDate.append(messagesDateHr);
    return messagesDate;
  }

  function isLastMessageToday(
    lastListMessage: MessageType,
    currentMessage: MessageType
  ) {
    if (!lastListMessage) {
      return true;
    }

    const dateLastListMessage = new Date(
      lastListMessage.createdAt
    ).toLocaleDateString();
    const dateCurrentMessage = new Date(
      currentMessage.createdAt
    ).toLocaleDateString();

    return dateLastListMessage !== dateCurrentMessage;
  }

  function TextBox(props: { onSubmit: (params: SendMessageParams) => void, messageId?: string }) {
    const el = Div({
      id: 'textbox',
    });
    setStyle(el, {
      flexShrink: '0',
      maxHeight: '25%',
      minHeight: '6%',
      marginTop: 'auto',
      display: 'flex',
      padding: '0 15px',
      paddingBottom: '15px',
    });

    const originalHeight = el.style.height;

    const input = TextArea();
    input.id = 'textinput';
    setStyle(input, {
      height: '100%',
      width: '100%',
      boxSizing: 'border-box',
      resize: 'none',
      overflow: 'auto',
      marginRight: '5px',
      padding: '5px',
      font: 'inherit',
    })

    input.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    input.addEventListener("drop", (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (e.dataTransfer) {
        const files = e.dataTransfer.files;
        const fileData = new FormData();
        fileData.append('file', files[0]);
        document.getElementsByClassName('message-list')[0].scrollTo({
          top: 0,
        });
        handleSubmitFile(fileData);
      }
    })

    const btnSubmit = Button({
      text: '>',
    })
    setStyle(btnSubmit, {
      maxHeight: '45px',
      width: '30px',
    })
    onClick(btnSubmit, () => {
      const inputText = input.value.trim();
      if (props.messageId) {
        props.onSubmit(
          {
            text: inputText,
            id: props.messageId,
          }
        );

        const editedMessage = byId(props.messageId);
        editedMessage.classList.toggle('being-edited');
        editedMessage.style.backgroundColor = '';

        el.remove();
        messageView.appendChild(textBox);
        messageBeingEdited = false;
      } else {
        props.onSubmit(
          {
            text: inputText
          }
        );
      }
      input.value = '';
      el.style.height = originalHeight;
      document.getElementsByClassName('message-list')[0].scrollTo({
        top: 0,
      });
    })

    input.addEventListener('keydown', (e) => {
      const scrollHeight = input.scrollHeight;
      if (scrollHeight > Number(originalHeight)) {
        el.style.height = String(scrollHeight);
      }
      if (e.key === 'Enter' && !e.shiftKey) {
        const inputText = input.value.trim();
        e.preventDefault();
        if (props.messageId) {
          props.onSubmit(
            {
              text: inputText,
              id: props.messageId,
            }
          );

          const editedMessage = byId(props.messageId);
          editedMessage.classList.toggle('being-edited');
          editedMessage.style.backgroundColor = '';

          el.remove();
          messageView.appendChild(textBox);
          messageBeingEdited = false;
        } else {
          props.onSubmit(
            {
              text: inputText
            }
          );
        }
        input.value = '';
        el.style.height = originalHeight;
        document.getElementsByClassName('message-list')[0].scrollTo({
          top: 0,
        });
      }
    });


    const uploadDiv = Div();
    setStyle(uploadDiv, {
      height: "100%",
      cursor: "pointer",
      width: "30px",
      maxHeight: '45px',
      border: "1px solid black",
      marginRight: "10px",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "3px",
    })

    const uploadBtn = Input();
    setStyle(uploadBtn, {
      opacity: "0",
      cursor: "pointer",
      height: "100%",
      width: "100%",
      position: "absolute",
    });
    uploadBtn.type = 'file';
    uploadBtn.id = 'file';

    uploadBtn.addEventListener('change', (e) => {
      const fileData = new FormData();
      fileData.append('file', uploadBtn.files[0]);
      document.getElementsByClassName('message-list')[0].scrollTo({
        top: 0,
      });
      handleSubmitFile(fileData);
    });

    const uploadText = Span();
    setStyle(uploadText, {

    });
    uploadText.innerHTML = "+";


    const emojiBtn = Div()

    if (!isMobile) {
        setStyle(emojiBtn, {
        height: "100%",
        cursor: "pointer",
        width: "30px",
        maxHeight: "45px",
        border: "1px solid black",
        marginRight: "10px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "3px",
      });

      emojiBtn.textContent = "😊"

      const emojiContainer = Div();
      setStyle(emojiContainer, {
        flexWrap: "wrap",
        alignContent: "flex-start",
        gap: "2px",
        position: "absolute",
        left: "0",
        right: "45px",
        bottom: "45px",
        backgroundColor: "WhiteSmoke",
        border: " 1px solid black",
        borderRadius: "3px",
        height: "200px",
        width: "200px",
        overflow: "auto",
        userSelect: "none",
        display: "none"
      })

      emojiList.forEach((emoji) => {
        const emojiFlexChild = Div();
        emojiFlexChild.textContent = emoji;
        emojiFlexChild.addEventListener('click', (e) => {
          input.value += emoji;
        })
        emojiContainer.appendChild(emojiFlexChild)
      })

      emojiBtn.appendChild(emojiContainer);

      emojiBtn.addEventListener('click', function(e) { 
        if(this === e.target) {
          emojiContainer.style.display === "none" ? emojiContainer.style.display = "flex" : emojiContainer.style.display = "none"
        }
      })

      //Closes emoji container when clicked outside
      document.addEventListener('click', (e) => {
        if (!emojiBtn.contains(e.target as Node)) {
          emojiContainer.style.display = "none";
        }
      })
    }

    uploadDiv.appendChild(uploadBtn);
    uploadDiv.appendChild(uploadText);

    // Add upload button
    el.appendChild(uploadDiv);

    //Add emoji button
    !isMobile ? el.appendChild(emojiBtn) : null;

    // Add text area
    el.appendChild(input);

    // Add submit button on small screens
    if (mql.matches) {
      el.appendChild(btnSubmit);
    }

    mql.addEventListener('change', (e) => {
      if (e.matches) {
        el.appendChild(btnSubmit);
      } else {
        el.removeChild(btnSubmit);
      }
    })



    setTimeout(() => {
      input.focus();
    }, 0);

    return el;
  }

  function RoomHeader() {
    const el = Div({
      class: 'room-header'
    });

    setStyle(el, {
      display: 'flex',
      borderBottom: Borders.bottom,
      padding: '8px',
      width: '100%',
      margin: '0 auto',
    });

    const btnBack = Button({
      text: '<',
    });
    el.append(btnBack);
    onClick(btnBack, () => {
      setURL(Routes.home);
    });

    const btnSidebar = Button({
      text: 'Toggle Sidebar'
    });
    setStyle(btnSidebar, {
      marginLeft: '10px',
    })
    el.append(btnSidebar);

    onClick(btnSidebar, () => {
      toggleSidebar();
      localStorage.getItem('sidebar') === 'true' ?
        document.getElementById('sidebar').style.width = "200px" :
        document.getElementById('sidebar').style.width = "0px";
    })

    const roomNameEl = Div({
      class: 'room-name-el'
    });

    setStyle(roomNameEl, {
      paddingLeft: '8px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      paddingRight: '20px',
    });
    setText(roomNameEl, room.name);

    el.append(roomNameEl);

    return el;
  }

  function SideBar() {
    const el = Div({
      id: 'sidebar'
    });
    setStyle(el, {
      flexShrink: '0',
      flexGrow: '0',
      width: '0px',
      maxWidth: '33.33%'
    })
    if (localStorage.getItem('sidebar') === 'true') {
      el.style.width = '200px';
    }

    const roomList = RoomList();
    setStyle(roomList, {
      flexShrink: '0',
    })
    el.append(roomList);
    return el;
  }

  function toggleSidebar() {
    sideBarEnabled = !sideBarEnabled;

    localStorage.setItem('sidebar', sideBarEnabled ? 'true' : 'false');
  }

  roomView.append(SideBar());
  roomView.append(messageView);

  const roomHeader = RoomHeader();
  messageView.append(roomHeader);

  const messageList = MessageList();

  type SendMessageParams = {
    text: string;
    id?: string;
  }

  function handleSubmit(params: SendMessageParams) {
    sendRoomMessage({
      room: props.roomId,
      body: params.text,
    });
  }

  function handleSubmitFile(fileToSubmit: FormData) {
    sendFile({
      fileData: fileToSubmit,
      room: props.roomId,
    })
  }

  function handleFileDrop(e) {

  }

  function handleDeleteMessage(id: string) {
    deleteRoomMessage({
      room: props.roomId,
      id: id,
    });
  }

  function handleEditMessage(params: SendMessageParams) {
    editRoomMessage({
      room: props.roomId,
      id: params.id,
      body: params.text,
    })
  }

  const textBox = TextBox({ onSubmit: handleSubmit });

  messageView.appendChild(messageList);
  messageView.appendChild(textBox);

  return roomView;
}
