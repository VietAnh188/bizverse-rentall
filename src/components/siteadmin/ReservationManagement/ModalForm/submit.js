// Redux Actions
import { payoutHost } from '../../../../actions/Reservation/payoutHost';
import { refundGuest } from '../../../../actions/Reservation/refundGuest';
import { closeReservationModal } from '../../../../actions/Reservation/payoutModal';

// config
import { paymentMethods } from '../../../../config';

async function submit(values, dispatch) {
	let paymentCurrency = Number(values.paymentMethodId) === paymentMethods.PAYPAL_PAYMENT_ID ? values.paymentCurrency : null;

	if (values.type === 'host') {
		paymentCurrency = Number(values.paymentMethodId) === paymentMethods.STRIPE_PAYMENT_ID ? values.payoutCurrency : paymentCurrency;
		dispatch(
			payoutHost(
				values.reservationId,
				values.receiverEmail,
				values.payoutId,
				values.amount,
				values.currency,
				paymentCurrency,
				values.hostId,
				Number(values.paymentMethodId),
				values.hostEmail
			)
		);
		dispatch(closeReservationModal());
	}

	if (values.type === 'guest') {
		dispatch(
			refundGuest(
				values.reservationId,
				values.receiverEmail,
				values.receiverId,
				values.payerEmail,
				values.payerId,
				values.amount,
				values.currency,
				paymentCurrency,
				Number(values.paymentMethodId),
				values.transactionId,
				values.payEmail
			)
		);
		dispatch(closeReservationModal());
	}
}

export default submit;
