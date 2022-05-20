self.addEventListener('push', (e) => {
    const message = e.data.json();
    e.waitUntil(
        self.registration.showNotification(message.title, {
            body: message.body,
            data: {
                roomId: message.room,
            }
        })
    );
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
                    const url = new URL(client.url);
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