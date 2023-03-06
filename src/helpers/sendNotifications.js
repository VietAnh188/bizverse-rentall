
// Fetch request
import fetch from '../core/fetch';
import { pushNotificationMessage } from './pushNotificationMessage';

export async function sendNotifications(actionType, notifyContent, userId) {

    const { title, message } = await pushNotificationMessage(actionType, notifyContent);
    let content = notifyContent;
    content['title'] = title;
    content['message'] = message;

    const resp = await fetch('/push-notification', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content,
            userId
        }),
        credentials: 'include'
    });

    const { status, errorMessge } = resp.json;

    return await {
        status,
        errorMessge
    };

}

export default {
    sendNotifications
}
