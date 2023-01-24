export async function saveSubscription(subscription) {
    await fetch('/api/subscriptions', {
        method: 'POST',
        body: JSON.stringify({
            subscription
        }),
        headers: {
            'content-type': 'application/json',
        },
    });
}

export async function deleteSubscription(subscription) {
    await fetch('/api/subscriptions', {
        method: 'DELETE',
        body: JSON.stringify({
            subscription
        }),
        headers: {
            'content-type': 'application/json',
        },
    });
}

export async function getPublicKey() {
    const data = await fetch('/api/subscriptions/publickey');
    const jsonData = await data.json();
    return jsonData.publickey;
}