import { setURL } from '../utils/HistoryUtils'

let notificationsEnabled = false;

function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch (err) {
    console.error(err);
    return false;
  }

  return true;
}

export function initializeNotificationService() {
  notificationsEnabled = localStorage.getItem('notifications') === 'true';

  if (!('Notification' in window)) {
    return;
  }

  const isNotificationsPromiseSupported = checkNotificationPromise();

  if (!isNotificationsPromiseSupported) {
    /* Safari does not support the promise-based version */
    Notification.requestPermission();
  }
}

export function areNotificationsEnabled() {
  return notificationsEnabled;
}

export function toggleNotificationsEnabled() {
  notificationsEnabled = !notificationsEnabled;

  localStorage.setItem(
    'notifications',
    notificationsEnabled ? 'true' : 'false'
  );
}

type SendNotificationParams = {
  title: string;
  body: string;
  roomId: string;
};

export function inSameRoom(roomID: string) {
  return (document.URL.includes(roomID) && document.hasFocus()) ? true : false;
}

export function sendNotification(params: SendNotificationParams) {
  if (!areNotificationsEnabled() || inSameRoom(params.roomId)) {
    return;
  }
  const notification = new Notification(params.title, { body: params.body });
  notification.onclick = () => {
    window.focus()
    setURL(`/rooms/${params.roomId}`)
  }
}