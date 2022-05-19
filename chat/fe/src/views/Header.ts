import { isLoggedIn } from '../apis/UserApi';
import { Button } from '../components/Button';
import { Div } from '../components/Div';
import { areNotificationsEnabled, toggleNotificationsEnabled } from '../services/NotificationService';
import { arePushNotificationsSubscribed, togglePushNotifications } from '../services/PushService';
import { setStyle, setText } from '../utils/DomUtils';

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
  
  const headerActionsEl = Div();
  el.append(headerActionsEl);

  const btnNotifications = Button({
    text: ""
  });

  updateNotificationButtonText();
  function updateNotificationButtonText() {
    setText(btnNotifications, areNotificationsEnabled() ? "pause notifications" : "enable notifications")
  }

  headerActionsEl.append(btnNotifications);

  btnNotifications.addEventListener("click", async function () {
    toggleNotificationsEnabled();
    updateNotificationButtonText();
  });

  // TODO: Separate button for push notifications
  const btnPushNotifications = Button({
    text: ""
  });

  updatePushNotificationButtonText();

  async function updatePushNotificationButtonText() {
    // console.log('2', 'inside updatetext');
    const pushNotificationStatus = await arePushNotificationsSubscribed();
    console.log('current sub status: ' , pushNotificationStatus);
    // console.log('updating button text');
    setText(btnPushNotifications, pushNotificationStatus ? "pause push notifications" : "enable push notifications");
    // console.log('button text updated');
  }

  headerActionsEl.append(btnPushNotifications);

  btnPushNotifications.addEventListener('click', async function () {
    console.log('start', await arePushNotificationsSubscribed());
    await togglePushNotifications();
    console.log('calling update button');
    await updatePushNotificationButtonText();
    console.log('finish', await arePushNotificationsSubscribed());

  })

  // --------------------------------------------

  if (!isLoggedIn()) {
    const btnLogin = Button({
      text: "login",
    });
    headerActionsEl.append(btnLogin);

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
