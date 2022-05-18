// https://developers.google.com/web/fundamentals/codelabs/push-notifications/

import { initializeNotificationService } from "./NotificationService";
const pushServerPublicKey = "BLavcK_L2yrLCLCPH0tBeA_dljC6hMEG68imaJvs0DPd4G2R8SdEnkJ6LJeFCXq6T_JpfLsVOaHEXdXKh94Jpqo"
let swRegistration = null;

function isPushNotificationSupported() {
    return ('PushManager' in window) && ('serviceWorker' in navigator);
}

// Register and subscribe user to push service
export function registerServiceWorker() {
    console.log('attempting to register service worker');
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js').then((registration) => {
            console.log('Service worker is registered', registration);

            swRegistration = registration;
        })
        .catch((error) => {
            console.error('Service worker error', error);
        });
    })
}

function createNotificationSubscription() {
    return navigator.serviceWorker.ready.then((serviceWorker) => {
        return serviceWorker.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: pushServerPublicKey,
        })
    })
        .then((subscription) => {
            console.log("User is subscribed:", subscription);
            return subscription;
        });
}

function handleNotificationSubscription() {

}

export function initializePushNotificationService() {
    if (!isPushNotificationSupported()) {
        console.log('Push notifications are not supported');
        return;
    }
    registerServiceWorker();
    // initializeNotificationService();
}

function sendPushNotification() {

}

// https://developers.google.com/web/ilt/pwa/lab-integrating-web-push#1_get_set_up