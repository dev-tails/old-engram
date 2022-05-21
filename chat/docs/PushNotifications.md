# Push Notifications

## [VAPID](https://datatracker.ietf.org/doc/html/draft-ietf-webpush-vapid-01) - Voluntary Application Server Identification for Web Push
In order to maintain security while using the Web Push Protocol, one can use the VAPID protocol. This application uses the node web-push library to sign and send push messages and it is necessary to set the VAPID details.

Below is the method used to set the necessary information for the web-push library to properly sign and send messages and an explanation on how to generate each field:
```
  webpush.setVapidDetails(
    `mailto: test@test.com`,
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
  )
```
- mailto: (*insert email address*)
    - Entering an email is required and will be used in case the VAPID keys have been abused and the browser vendor needs to contact you
- VAPID_PUBLIC_KEY/VAPID_PRIVATE_KEY pair:
    - These can be generated using the following ways:
        1. [Generated using a website](https://web-push-codelab.glitch.me/)
        2. Dynamically during server start using web-push node library:
            ```
            const vapidKeys = webpush.generateVAPIDKeys();
            const publicKey = vapidKeys.publicKey;
            const privateKey = vapidKeys.privateKey;
            ```
        3. Using command line and web-push library:
            ```
             // Run this command from chat directory:

             ./be/node_modules/.bin/web-push generate-vapid-keys 
            ```
            ```
            // Output:

            =======================================

            Public Key:
            BO7nXV9dokz-gy5VbkJJUOHDqHu23V9j2W2CatyCR2GKoVpHpNrszBZ2DonSf0K8xSBntiFAzCksRHVaJpTJ5Qs

            Private Key:
            5ogwqaVQKLjBed-wj7QtqwsynUmPYgqQOK08sd68uhM

            =======================================

            // Please do not use these keys and generate new // ones
            ```

# Resources
https://developers.google.com/web/ilt/pwa/lab-integrating-web-push#1_get_set_up
https://developers.google.com/web/fundamentals/codelabs/push-notifications/
https://felixgerschau.com/web-push-notifications-tutorial/
https://ericfossas.medium.com/quick-tut-notifications-sse-socketio-push-api-d68080f218df