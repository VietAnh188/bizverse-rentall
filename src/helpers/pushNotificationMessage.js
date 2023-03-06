import { capitalizeFirstLetter } from './capitalizeFirstLetter';

export function formatAmount(amount, currency, locale) {
    let convertCurrency = 'USD';
    if (amount) {
        convertCurrency = currency ? currency : convertCurrency;
        return amount.toLocaleString(locale, { style: 'currency', currency: convertCurrency });
    } else {
        return null;
    }
}

export function formatText(text) {
    let capitalizedText = capitalizeFirstLetter(text);
    return capitalizedText ? capitalizedText.trim() : '';
}

export async function pushNotificationMessage(actionType, notifyContent) {
    let title = '', message = '';

    if (actionType === 'newEnquiry') {
        title = `New Enquiry`;
        message = `${formatText(notifyContent['userName'])}: ${notifyContent['content']}`;
    }

    if (actionType === 'declined') {
        title = `Declined`;
        message = `${formatText(notifyContent['userName'])}: Booking is Declined`;
    }

    if (actionType === 'approved') {
        title = `Approved`;
        message = `${formatText(notifyContent['userName'])}: Booking is Approved`;
    }

    if (actionType === 'newMessage') {
        title = `New Message`;
        message = `${formatText(notifyContent['userName'])}: ${notifyContent['content']}`;
    }

    if (actionType === 'cancelReservation') {
        title = `Booking is Cancelled`;
        message = `${formatText(notifyContent['userName'])}: ${notifyContent['content']}`;
    }

    if (actionType === 'newBooking') {
        title = `New Booking`;
        message = `${formatText(notifyContent['userName'])}: ${notifyContent['content']}`;
    }

    if (actionType === 'listApproved') {
        title = `The Admin has verified your listing`;
        message = `${formatText(notifyContent['userName'])} : The Admin has verified your listing ${notifyContent['listTitle']} . Please publish your listing to get reservations.`;
    }

    if (actionType === 'listDeclined') {
        title = `Admin has declined your listing`;
        message = `${formatText(notifyContent['userName'])} : Admin has declined your listing request for the ${notifyContent['listTitle']} due to the reason of ${notifyContent['reason']}. Kindly update the listing information and submit for the list approval.`;
    }

    return {
        title,
        message
    };
}