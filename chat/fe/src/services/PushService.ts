// https://developers.google.com/web/ilt/pwa/lab-integrating-web-push#1_get_set_up
// https://developers.google.com/web/fundamentals/codelabs/push-notifications/
// https://felixgerschau.com/web-push-notifications-tutorial/
// https://ericfossas.medium.com/quick-tut-notifications-sse-socketio-push-api-d68080f218df

import { saveSubscription, deleteSubscription } from "../apis/PushNotificationApi";
import { initializeNotificationService } from "./NotificationService";
export const applicationServerPublicKey = "BLavcK_L2yrLCLCPH0tBeA_dljC6hMEG68imaJvs0DPd4G2R8SdEnkJ6LJeFCXq6T_JpfLsVOaHEXdXKh94Jpqo"
export const applicationServerPrivateKey = "2QQyhPuDNlcPFlt6UgNMOjrCZzMrm8vkei7tIOfLjZ4"
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function isPushNotificationSupported() {
    return ('PushManager' in window) && ('serviceWorker' in navigator);
}

export async function arePushNotificationsSubscribed() {
    console.log('checking notification subscription');
    const serviceWorker = await navigator.serviceWorker.ready;
    return await serviceWorker.pushManager.getSubscription() ? true : false;
    // .then((subscription) => {
    //     const isSubscribed = !(subscription === null);
    //     return isSubscribed ? true : false;
    // })
}

export async function togglePushNotifications() {
    const serviceWorker = await navigator.serviceWorker.ready;
    const subStatus = await arePushNotificationsSubscribed();
    console.log('service worker ready ', serviceWorker)
    if (!(await arePushNotificationsSubscribed())) { // activate push notifications
        console.log('subscribing to push notifs');
        const subscription = await serviceWorker.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(applicationServerPublicKey),
        })

        if (subscription) {
            console.log(subscription);
            saveSubscriptionOnServer(subscription);
        }
        // }).then(async (subscription) => {
        //     if (subscription) {
        //         await saveSubscriptionOnServer(subscription);
        //         console.log('saving subscription complete');
        //         // isSubscribed = true
        //     }
        // })
        //     .catch((err) => {
        //         console.log('Failed to subscribe user: ', err);
        //     })
    } else { // deactivate push notifications
        console.log('unsub from push notifs');
        const unsubscription = (await serviceWorker.pushManager.getSubscription()).unsubscribe();
        // .then((subscription) => {
        //     subscription.unsubscribe()
        //     .then(async (successful) => {
        //         if (successful) {
        //             await removeSubscriptionOnServer();
        //             isSubscribed = false;
        //         }
        //     })
        //         .catch((err) => {
        //             console.log('Failed to unsubscribe user: ', err)
        //         })
        // })
        if (unsubscription) {
            // (await subscription).unsubscribe();
            removeSubscriptionOnServer();
        }
    }
    console.log('toggle sub complete');
}

async function saveSubscriptionOnServer(subscription) {
    console.log('sending subscription to server');
    saveSubscription(subscription);
}

async function removeSubscriptionOnServer() {
    console.log('removing subscription from server');
    deleteSubscription();
}

export function registerServiceWorker() {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('Service worker is registered', registration);

            swRegistration = registration;
        })
            .catch((error) => {
                console.error('Service worker error', error);
            });
    })
}


export function initializePushNotificationService() {
    if (!isPushNotificationSupported()) {
        console.log('Push notifications are not supported');
        return;
    }
    registerServiceWorker();
    initializeNotificationService();
}

