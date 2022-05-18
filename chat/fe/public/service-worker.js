// TODO: get this to send the appropriate data

self.addEventListener('push', (e) => {
    self.registration.showNotification('Test', {
        body: 'Test notification',
    })
})