import fetch from '../../fetch';

export async function refundToGuest(
    reservationId, receiverEmail, receiverId, payerEmail, payerId, amount, currency, payEmail
) {
    const resp = await fetch('/refund', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            reservationId, receiverEmail, receiverId, payerEmail, payerId, amount, currency, payEmail
        }),
        credentials: 'include'
    });
    const { status } = await resp.json();
    return { status };
}