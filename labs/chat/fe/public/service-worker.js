self.addEventListener('activate', (e) => {
    e.waitUntil(clients.claim());
});

self.addEventListener('push', (e) => {
    const message = e.data.json();
    const roomUrl = ('/rooms/' + message.room.id);

    function checkMessageIsInActiveWindow() {
        return clients
            .matchAll({
                type: 'window',
                includeUncontrolled: true,
            })
            .then((clientList) => {
                let activeWindow = false;

                for (let i = 0; i < clientList.length; i++) {
                    const client = clientList[i];
                    const clientUrl = new URL(client.url);
                    if (client.focused && clientUrl.pathname == roomUrl) {
                        activeWindow = true;
                        break;
                    }
                }

                return activeWindow;
            });
    }


    const promiseChain = checkMessageIsInActiveWindow().then((messageInActiveWindow) => {
        if (messageInActiveWindow) {
            return true;
        } else {
            return false;
        }
    }).then((messageInActiveWindow) => {
        if (messageInActiveWindow) {
            return;
        }

        return registration.getNotifications({ tag: message.room.id }).then((notifications) => {
            return notifications[notifications.length - 1];
        }).then((currentNotification) => {
            let notificationTitle;
            const options = {
                tag: message.room.id,
                renotify: true,
                data: {
                    roomId: message.room,
                }
            }
            if (currentNotification) {
                const newNotificationCount = currentNotification.data.newNotificationCount + 1;
                notificationTitle = `${newNotificationCount} new messages in ${message.roomName}`
                options.data = {
                    ...options.data,
                    newNotificationCount: newNotificationCount,
                }
                currentNotification.close();
            } else {
                notificationTitle = message.title;
                options.body = message.body,
                    options.data = {
                        ...options.data,
                        newNotificationCount: 1,
                    }

            }
            return self.registration.showNotification(notificationTitle, options);
        });
    })

    e.waitUntil(promiseChain);
});

self.addEventListener('notificationclick', (e) => {
    const roomUrl = ('/rooms/' + e.notification.data.roomId.id);
    e.notification.close();
    e.waitUntil(
        clients.matchAll({
            type: 'window'
        })
            .then(clientList => {
                let windowMatchFound = false;

                for (let i = 0; i < clientList.length; i++) {
                    let client = clientList[i];
                    if (client) {
                        client.navigate(roomUrl);
                        client.focus();
                        windowMatchFound = true;
                        break;
                    }
                }

                if (!windowMatchFound) {
                    return clients.openWindow(roomUrl);

                }
            })
    );
})