import { setStyle } from '../utils/DomUtils';
import { Div } from './Div';

export function UserIcon(userName: string, userColor: string) {
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
    backgroundColor: userColor || 'black',
    color: 'white',
    textAlign: 'center',
    lineHeight: '30px',
    marginRight: '10px',
    fontSize: '12px',
  });

  const firstInitial = userName.charAt(0);
  const lastInitial = userName.split(' ')[1].charAt(0);

  userIcon.innerText = firstInitial + lastInitial;

  return userIcon;
}
