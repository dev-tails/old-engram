import { getSelf } from "./UserApi";

export async function saveSubscription(subscription) {
    const currentUser = getSelf();
    await fetch('/api/subscriptions', {
        method: 'POST',
        body: JSON.stringify({
            user: currentUser,
            subscription
        }),
        headers: {
            'content-type': 'application/json',
        },
    });
}

export async function deleteSubscription(subscription) {
    const currentUser = getSelf();
    await fetch('/api/subscriptions', {
        method: 'DELETE',
        body: JSON.stringify({
            user: currentUser,
            subscription
        }),
        headers: {
            'content-type': 'application/json',
        },
    });
}