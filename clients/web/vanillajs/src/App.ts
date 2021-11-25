import { Div } from './Div';
import { TextBox } from './TextBox';

export function App() {
  const el = Div();

  el.appendChild(TextBox());

  return el;
}
