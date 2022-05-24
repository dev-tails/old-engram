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

    e.waitUntil(checkMessageIsInActiveWindow().then((messageInActiveWindow) => {
        if (messageInActiveWindow) {
            return;
        }

        return self.registration.showNotification(message.title, {
            body: message.body,
            data: {
                roomId: message.room,
            }
        });
    }))
})

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