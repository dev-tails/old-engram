// Add a way to bind the subscription to the user

import { getSelf } from "./UserApi";

const currentUser = getSelf();

export async function saveSubscription(subscription) {
    console.log('body:' , JSON.stringify({user: currentUser, subscription}));
    

    await fetch('/subscriptions', {
        method: "POST",
        body: JSON.stringify({user: currentUser, subscription}),
        headers: {
            'content-type' : 'application/json',
        },
    });
}

// TODO: allow user to be able to unsubscribe from push notifications
export async function deleteSubscription(subscription) {
    
}