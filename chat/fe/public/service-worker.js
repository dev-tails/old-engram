// https://developer.mozilla.org/en-US/docs/Web/API/WindowClient
// https://developer.mozilla.org/en-US/docs/Web/API/Client
// https://developer.mozilla.org/en-US/docs/Web/API/WindowClient/navigate 


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
    console.log('notification clicked');
    console.log(e.notification.data.roomId);
    const roomUrl = ('/rooms/' + e.notification.data.roomId.id);
    e.notification.close();
    e.waitUntil(
        clients.matchAll({ type: 'window' })
            .then(clientList => {
                let windowMatchFound = false;
                for (let i = 0; i < clientList.length; i++) {
                    let client = clientList[i];

                    const url = new URL(client.url);
                    console.log(client);
                    console.log(url.pathname);
                    console.log(roomUrl);

                    // Active/Minimized Window case
                    if (roomUrl == url.pathname && 'focus' in client) {
                        console.log('url match');
                        client.focus();
                        windowMatchFound = true;
                        break;
                    }
                }
                // console.log(clients.openWindow);
                console.log(windowMatchFound);
                if (!windowMatchFound) {
                    return clients.openWindow(roomUrl);
                }
// https://developer.mozilla.org/en-US/docs/Web/API/WindowClient
// https://stackoverflow.com/questions/30302636/clients-openwindow-not-allowed-to-open-a-window-on-a-serviceworker-google-c
            })
    );
})