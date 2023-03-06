// Sequelize models
import { Reservation, Threads, UserProfile, Listing } from '../../data/models';
import { sendNotifications } from '../../helpers/sendNotifications';

import { sendServerEmail } from '../email/sendServerEmail';

export const sendEmailAndNotification = async ({ 
    reservationState,
    reservationId, 
    threadId,
    userId
}) => {
    let emailContent;
    let notifyUserId, notifyUserType, notifyContent;
    let userName;

    const getThread = await Threads.findOne({
        attributes: ['host', 'guest', 'listId'],
        where: {
            id: threadId
        },
        raw: true
    });

    if (getThread?.host && getThread?.guest) {
        if (getThread.host === userId) {
            notifyUserId = getThread.guest;
            notifyUserType = 'guest';
        } else {
            notifyUserId = getThread.host;
            notifyUserType = 'host';
        }
    }

    const hostProfile = await UserProfile.findOne({
        attributes: ['firstName'],
        where: {
            userId: getThread.host
        },
        raw: true
    });

    const guestProfile = await UserProfile.findOne({
        attributes: ['firstName'],
        where: {
            userId: getThread.host
        },
        raw: true
    });

    const listData = await Listing.findOne({
        attributes: ['title', 'city'],
        where: {
            id: getThread?.listId
        },
        raw: true
    });

    const reservationData = await Reservation.findOne({
        attributes: ['checkIn', 'confirmationCode'],
        where: {
            id: reservationId
        },
        raw: true
    });

    if (hostProfile && getThread) {
        userName = hostProfile?.firstName || null;
    }

    switch(reservationState) {
        case 'approved':
            emailContent = {
                hostName: hostProfile?.firstName,
                guestName: guestProfile?.firstName,
                listTitle: listData?.title,
                listCity: listData?.city,
                threadId
            };
            sendServerEmail(getThread.guest, 'bookingConfirmedToGuest', emailContent);

            break;

        case 'declined':
            emailContent = {
                hostName: hostProfile?.firstName,
                guestName: guestProfile?.firstName,
                checkIn: reservationData?.checkIn,
                confirmationCode: reservationData?.confirmationCode
            };
            sendServerEmail(getThread.guest, 'bookingDeclinedToGuest', emailContent);

            break;

        default:
    }

    notifyContent = {
        screenType: "trips",
        userType: notifyUserType.toString(),
        userName,
    };
    sendNotifications(reservationState, notifyContent, notifyUserId);
}