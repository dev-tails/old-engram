// TODO: get this to send the appropriate data

self.addEventListener('push', (e) => {
    const data = e.data.json();

    self.registration.showNotification(data.title, {
        body: data.body,
    })
})