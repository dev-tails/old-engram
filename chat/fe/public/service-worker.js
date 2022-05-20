// https://developer.mozilla.org/en-US/docs/Web/API/WindowClient
// https://developer.mozilla.org/en-US/docs/Web/API/Client
// https://developer.mozilla.org/en-US/docs/Web/API/WindowClient/navigate 
// https://developer.mozilla.org/en-US/docs/Web/API/WindowClient
// https://stackoverflow.com/questions/30302636/clients-openwindow-not-allowed-to-open-a-window-on-a-serviceworker-google-c


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
            includeUncontrolled: true,
            type: 'window'
        })
            .then(clientList => {
                let windowMatchFound = false;
                console.log('found clients: ', clientList.length);
                for (let i = 0; i < clientList.length; i++) {
                    let client = clientList[i];
                    const url = new URL(client.url);

                    console.log(client);

                    if (roomUrl == url.pathname) {
                        console.log('url match');
                        // client.navigate(roomUrl);
                        // client.navigate(roomUrl);
                        client.focus();
                        // client.navigate(roomUrl).then((client) => { client.focus()});
                        windowMatchFound = true;
                        break;
                    } else {
                        client.navigate(roomUrl).then((client) => { client.focus() });
                        windowMatchFound = true;
                        break;
                    }
                }
                // https://stackoverflow.com/questions/39476963/service-worker-redirecting-a-user-to-different-url-when-he-clicks-the-notificat
                if (!windowMatchFound) {
                    console.log('opening a new tab');
                    return clients.openWindow(roomUrl);

                }
            })
    );
})