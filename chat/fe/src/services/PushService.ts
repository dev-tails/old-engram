// https://developers.google.com/web/ilt/pwa/lab-integrating-web-push#1_get_set_up
// https://developers.google.com/web/fundamentals/codelabs/push-notifications/
// https://felixgerschau.com/web-push-notifications-tutorial/
// https://ericfossas.medium.com/quick-tut-notifications-sse-socketio-push-api-d68080f218df

import { saveSubscription, deleteSubscription } from "../apis/PushNotificationApi";
import { initializeNotificationService } from "./NotificationService";
export const applicationServerPublicKey = "BLavcK_L2yrLCLCPH0tBeA_dljC6hMEG68imaJvs0DPd4G2R8SdEnkJ6LJeFCXq6T_JpfLsVOaHEXdXKh94Jpqo"
export const applicationServerPrivateKey = "2QQyhPuDNlcPFlt6UgNMOjrCZzMrm8vkei7tIOfLjZ4"

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
    const serviceWorker = await navigator.serviceWorker.ready;
    return await serviceWorker.pushManager.getSubscription() ? true : false;
}

export async function togglePushNotifications() {
    const serviceWorker = await navigator.serviceWorker.ready;
    if (!(await arePushNotificationsSubscribed())) {
        const subscribed = await serviceWorker.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(applicationServerPublicKey),
        })
        if (subscribed) {
            saveSubscriptionOnServer(subscribed);
        }
    } else {
        const currentSubscription = await serviceWorker.pushManager.getSubscription();
        const unsubscribed = (await serviceWorker.pushManager.getSubscription()).unsubscribe();
        if (unsubscribed) {
            removeSubscriptionOnServer(currentSubscription);
        }
    }
}

async function saveSubscriptionOnServer(subscription) {
    saveSubscription(subscription);
}

async function removeSubscriptionOnServer(subscription) {
    deleteSubscription(subscription);
}

export function registerServiceWorker() {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then()
            .catch((error) => {
                console.error('Service worker error', error);
            });
    })
}


export function initializePushNotificationService() {
    if (!isPushNotificationSupported()) {
        console.error('Push notifications are not supported');
        return;
    }
    initializeNotificationService();
    registerServiceWorker();
}

