import { createRoom } from '../apis/RoomApi';
import { getUsers } from '../apis/UserApi';
import { Br } from '../components/Br';
import { Button } from '../components/Button';
import { Div } from '../components/Div';
import { Input } from '../components/Input';
import { Span } from '../components/Span';
import { setStyle } from '../utils/DomUtils';

const CreateRoomModal = async (buttonRef: HTMLElement) => {
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
      width: window.innerWidth <= 480 ? '70vw' : '20vw',
      padding: '20px',
      zIndex: '1',
      backgroundColor: 'white',
    });
  
    //Closes  when clicked outside
    document.addEventListener('click', (e) => {
      if (!createRoomModal.contains(e.target as Node) && !buttonRef.contains(e.target as Node)) {
        overlay.style.display = "none";
      }
    });

    const Header = Div();
    setStyle(Header, {
      display: 'flex',
      justifyContent: 'space-between',
    });

    const close = Button({text: 'X'})
    close.addEventListener('click', (e) => {
      overlay.style.display = 'none';
    })
    Header.append(Div().innerText = 'Create Room');
    Header.append(close);

    setStyle(Header, {
      fontSize: '30px',
      paddingBottom: '20px',
    })
    createRoomModal.appendChild(Header);

    const NameInput = Input();
    NameInput.type = 'text';
    const Label = Span();
    Label.textContent = 'Room Name: ';

    
    createRoomModal.append(Label, NameInput)

    const users = await getUsers();

    const AddUsersHeader = Div()
    AddUsersHeader.textContent = 'Add Users:';
    setStyle(AddUsersHeader, {
      paddingTop: '10px',
    })
    createRoomModal.appendChild(AddUsersHeader);

    const UserChecklist = Div();
    const SelectAllCheckbox = Input();
    SelectAllCheckbox.type = 'checkbox';
    const SelectAllCheckboxLabel = Span();
    SelectAllCheckboxLabel.textContent = 'Select All';

    createRoomModal.append(SelectAllCheckbox, SelectAllCheckboxLabel);

    users.forEach((user) => {
      const entry = Div();
      const checkbox = Input();
      checkbox.type = 'checkbox';
      checkbox.id = user._id;
      checkbox.name = user.name;

      const label = Span();
      label.textContent = user.name;

      entry.append(checkbox, label, Br())
      UserChecklist.append(entry);
    });

    createRoomModal.appendChild(UserChecklist);

    SelectAllCheckbox.addEventListener('change', (e) => {
      const checkboxes = UserChecklist.children;
      const selectAllCheckbox = e.target as HTMLInputElement;
      const selectAllIsChecked = selectAllCheckbox.checked;

      for(let i=0; i<checkboxes.length; i++) {
        const checkbox = checkboxes.item(i)?.firstChild as HTMLInputElement;
        if(selectAllIsChecked) {
          checkbox.checked = true;
        }
        else {
          checkbox.checked = false;
        }
      }
    });

    const SubmitButtonWrapper = Div();
    setStyle(SubmitButtonWrapper, {
      display: 'flex',
      justifyContent: 'flex-end',
    });

    const SubmitButton = Button({text: 'submit'});
    setStyle(SubmitButton, {
      marginLeft: '20px',
    });
    SubmitButton.addEventListener('click', async (e) => {
      if (createRoomModal.lastChild?.textContent == 'Name cannot be empty') {
        //do nothing since error is already present
      }
      else if (NameInput.value === '') {
        const NameInputError = Div()
        NameInputError.textContent = 'Name cannot be empty'
        setStyle(NameInputError, {
          color: 'red',
        });
        createRoomModal.appendChild(NameInputError);
      }
      else {
        const checklist = UserChecklist.children;
        let users: string[] = []; //_id's
        for(let i=0; i<checklist.length; i++) {
          const item = checklist.item(i)?.firstChild as HTMLInputElement
          if(item.checked) {
            users.push(item.id)
          };
        }
  
        await createRoom({name: NameInput.value, users: users});
        window.location.reload();
      }
    });
    SubmitButtonWrapper.appendChild(SubmitButton);
    createRoomModal.appendChild(SubmitButtonWrapper);

    overlay.appendChild(createRoomModal);

    return overlay;
}

export default CreateRoomModal;