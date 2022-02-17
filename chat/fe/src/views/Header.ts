import { isLoggedIn } from '../apis/UserApi';
import { Button } from '../components/Button';
import { Div } from '../components/Div';
import { setStyle } from '../utils/DomUtils';

export function Header() {
  const el = Div();

  setStyle(el, {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    flexShrink: "0",
    height: "50px",
    backgroundColor: "#424242",
    color: "white",
    fontSize: "2em",
    padding: "0 20px",
  });

  const roomTitle = Div();
  setStyle(roomTitle, {
    fontFamily: "'Courier New', Courier, monospace",
  });
  roomTitle.innerText = "XYZ";
  el.append(roomTitle);

  if (!isLoggedIn()) {
    const btnLogin = Button({
      text: "login",
    });
    el.append(btnLogin);

    btnLogin.addEventListener("click", async function () {
      const email = prompt("email");
      const password = prompt("password");

      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.ok) {
        window.location.reload();
      }
    });
  }

  return el;
}
