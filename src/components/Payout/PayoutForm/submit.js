// Redux Form
import { reset } from 'redux-form';

import { paymentMethods } from '../../../config';

import { addPayout } from '../../../actions/Payout/addPayoutAction';

async function submit(values, dispatch) {
	let paymentType = values.methodId;
	// PayPal
	let payEmail = paymentType === paymentMethods.PAYPAL_PAYMENT_ID ? values.payEmail : values.email;
	// Stripe
	let firstname = paymentType === paymentMethods.STRIPE_PAYMENT_ID ? values.firstname : null;
	let lastname = paymentType === paymentMethods.STRIPE_PAYMENT_ID ? values.lastname : null;
	let accountNumber = paymentType === paymentMethods.STRIPE_PAYMENT_ID ? values.accountNumber : null;
	let routingNumber = paymentType === paymentMethods.STRIPE_PAYMENT_ID ? values.routingNumber : null;
	let ssn4Digits = paymentType === paymentMethods.STRIPE_PAYMENT_ID ? values.ssn4Digits : null;
	let businessType = paymentType === paymentMethods.STRIPE_PAYMENT_ID ? values.businessType : null;

	if (paymentType === paymentType === paymentMethods.STRIPE_PAYMENT_ID && !values.isTokenGenerated) { // Checking Stripe token generated or not
		return;
	}

	dispatch(addPayout(
		values.methodId,
		payEmail,
		values.address1,
		values.address2,
		values.city,
		values.state,
		values.country,
		values.zipcode,
		values.currency,
		firstname,
		lastname,
		accountNumber,
		routingNumber,
		ssn4Digits,
		businessType,
		values.userId,
		values.accountToken,
		values.personToken
	)
	);
	//dispatch(reset('PayoutForm'));
}

export default submit;