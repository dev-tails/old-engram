import { saveSubscription, deleteSubscription, getPublicKey } from "../apis/PushNotificationApi";
import { initializeNotificationService } from "./NotificationService";

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
            applicationServerKey: urlB64ToUint8Array(await getPublicKey()),
        })
        if (subscribed) {
            await saveSubscriptionOnServer(subscribed);
        }
    } else {
        const currentSubscription = await serviceWorker.pushManager.getSubscription();
        const unsubscribed = (await serviceWorker.pushManager.getSubscription()).unsubscribe();
        if (unsubscribed) {
            await removeSubscriptionOnServer(currentSubscription);
        }
    }
}

async function saveSubscriptionOnServer(subscription) {
    await saveSubscription(subscription);
}

async function removeSubscriptionOnServer(subscription) {
    await deleteSubscription(subscription);
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

