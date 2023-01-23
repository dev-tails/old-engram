// import Peer from 'peerjs';
import { Button } from '../../../ui/components/Button';
import { Div } from '../../../ui/components/Div';
import { Input } from '../../../ui/components/Input';
import { byId } from '../../../ui/utils/DomUtils';
import { v4 as uuidV4 } from 'uuid';

export function Home() {
  const el = Div();

  const container = Div();
  const text = Div();
  text.innerText = 'Get random id';

  container.append(text);
  const myId = Input();
  myId.id = 'input-id';
  container.append(myId);

  const getIdBtn = Button({
    innerText: 'Get',
    onClick: () => {
      const input = document.getElementById('input-id');
      if (input) {
        (input as HTMLInputElement).value = uuidV4();
      }
    },
  });

  container.append(getIdBtn);
  el.append(container);

  return el;
}
