// Add a way to bind the subscription to the user

import { getSelf } from "./UserApi";



export async function saveSubscription(subscription) {
    const currentUser = getSelf();
    console.log('body:' , JSON.stringify({user: currentUser, subscription}));
    

    await fetch('/subscriptions', {
        method: 'POST',
        body: JSON.stringify({user: currentUser, subscription}),
        headers: {
            'content-type' : 'application/json',
        },
    });
}

// TODO: allow user to be able to unsubscribe from push notifications
export async function deleteSubscription() {
    const currentUser = getSelf();

    await fetch('/subscriptions', {
        method: 'DELETE',
        body: JSON.stringify({
            user: currentUser,
        }),
        headers: {
            'content-type' : 'application/json',
        },
    });
}