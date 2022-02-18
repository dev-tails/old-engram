let notificationsEnabled = false;

export function initializeNotificationService() {
  notificationsEnabled = localStorage.getItem("notifications") === "true";

  return Notification.requestPermission()
    .then()
    .catch((err) => {
      console.error(err);
    });
}

export function areNotificationsEnabled() {
  return notificationsEnabled;
}

export function toggleNotificationsEnabled() {
  notificationsEnabled = !notificationsEnabled;

  localStorage.setItem(
    "notifications",
    notificationsEnabled ? "true" : "false"
  );
}

type SendNotificationParams = {
  title: string;
  body: string;
};

export function sendNotification(params: SendNotificationParams) {
  if (!areNotificationsEnabled()) {
    return;
  }

  new Notification(params.title, { body: params.body });
}
